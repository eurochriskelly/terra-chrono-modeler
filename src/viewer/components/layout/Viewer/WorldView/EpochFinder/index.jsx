import React, { useState } from "react";
import { withResizeDetector } from 'react-resize-detector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import TimePeriodBar from './TimePeriodBar';
import BreadCrumb from './BreadCrumb';
import { TimeLine } from '../../../../base/Time';
import { getTimespan, periods } from './lib/geological-time-chart';

import './EpochFinder.css'

function EpochFinder({ width }) {
    const [selectedEon, setSelectedEon] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedEpoch, setSelectedEpoch] = useState(null);
    const [ready, setReady] = useState(false);
    const selections = {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
        setSelectedEon, setSelectedEra, setSelectedPeriod, setSelectedEpoch
    }

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
            <TimeLine startMa={getStartTime()} endMa={getEndTime()} width={width} />
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
                <button onClick={() => {
                    console.log(ready)
                    setReady(true)
                    console.log(ready)
                }}>DONE</button>
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
