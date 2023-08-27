import React, { useState } from "react";
import { withResizeDetector } from 'react-resize-detector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import TimePeriodBar from './TimePeriodBar';
import BreadCrumb from './BreadCrumb';
import { TimeLine } from '../../../../base/Time';
import { getTimespan, periods } from './lib/geological-time-chart';
import { Planet } from '../../../../base/Icon';

import './EpochFinder.css'

function EpochFinder({ width, epochs }) {
    console.log('epochs', epochs)
    const [selectedEon, setSelectedEon] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedEpoch, setSelectedEpoch] = useState(null);
    const [ready, setReady] = useState(false);
    const selections = {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
        setSelectedEon, setSelectedEra, setSelectedPeriod, setSelectedEpoch
    }

    const EmbedTimeline = () => {
        const getStartTime = () => {
            const sels = [selectedEon, selectedEra, selectedPeriod, selectedEpoch].filter(x => x)
            if (sels.length) {
                return getTimespan(periods,sels)?.start
            }
            return 540
        }
        const getEndTime = () => {
            const sels = [selectedEon, selectedEra, selectedPeriod, selectedEpoch].filter(x => x)
            if (sels.length) {
                return getTimespan(periods,sels)?.end
            }
            return 0
        }
        const endTime = getEndTime()
        const startTime = getStartTime()
        return (
            <TimeLine startMa={startTime} endMa={endTime} width={width}>{
                epochs.map(({ id, name, mya, radius }) => {
                    return (
                        <Planet key={id} xPos={mya} yPos={18} radius={radius/1000*1.8} />
                    )
                })
            }</TimeLine>
        )
    }


    return (
        <div id="epochFinder">
            <div className="pathFinder">
                <div>
                    <FontAwesomeIcon icon={faHourglassHalf} />&nbsp;
                    <BreadCrumb
                        name='eon' selected={selectedEon}
                        selections={selections}
                        setReady={setReady}
                    />
                    <BreadCrumb
                        name='era' selected={selectedEra}
                        selections={selections}
                        setReady={setReady}
                    />
                    <BreadCrumb
                        name='period' selected={selectedPeriod}
                        selections={selections}
                        setReady={setReady}
                    />
                    <BreadCrumb
                        name='epoch' selected={selectedEpoch}
                        selections={selections}
                        setReady={setReady}
                    />
                </div>
                <PromptNextTimespan selections={selections} ready={ready} setReady={setReady} />
            </div>
            { ready  ? <div/>: <TimePeriodBar periods={periods} selections={selections} width={width} />  }
            <EmbedTimeline />
        </div >
    )
}

export default withResizeDetector(EpochFinder);


function PromptNextTimespan({ selections, setReady, ready }) {
    const {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
    } = selections
    const sels = [selectedEon, selectedEra, selectedPeriod, selectedEpoch].filter(x => x)
    const next = getTimespan(periods, sels)
    const SelTimespan = (name) => {
        return (
            <div>
                <span className="promptNextTimespan">
                    Select {name} &nbsp;
                    <FontAwesomeIcon icon={faHandPointDown} />
                </span>
                <button onClick={() => setReady(true)}>DONE</button>
            </div>
        )
    }
    if (next && next.children && next.children.length > 0) {
        if (!selectedEon) return SelTimespan('eon')
        if (!selectedEra) return SelTimespan('era')
        if (!selectedPeriod) return SelTimespan('period')
        if (!selectedEpoch) return SelTimespan('epoch')
    }
}
