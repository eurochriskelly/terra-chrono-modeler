import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import TimePeriodBar from './TimePeriodBar';
import BreadCrumb from './BreadCrumb';
import { getTimespan, periods } from './lib/geological-time-chart';

import './EpochFinder.css'

function EpochFinder() {
    const [selectedEon, setSelectedEon] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedEpoch, setSelectedEpoch] = useState(null);

    const selections = {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
        setSelectedEon, setSelectedEra, setSelectedPeriod, setSelectedEpoch
    }

    return (
        <div id="epochFinder">
            <div className="pathFinder">
                <div>
                    <FontAwesomeIcon icon={faHourglassHalf} />&nbsp;
                    <BreadCrumb
                        name='eon' selected={selectedEon}
                        selections={selections}
                    />
                    <BreadCrumb
                        name='era' selected={selectedEra}
                        selections={selections}
                    />
                    <BreadCrumb
                        name='period' selected={selectedPeriod}
                        selections={selections}
                    />
                    <BreadCrumb
                        name='epoch' selected={selectedEpoch}
                        selections={selections}
                    />
                </div>
                <PromptNextTimespan selections={selections} />
            </div>
            <TimePeriodBar periods={periods} selections={selections} />
        </div >
    )
}

export default EpochFinder


function PromptNextTimespan({ selections }) {
    const {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
    } = selections
    const sels = [selectedEon, selectedEra, selectedPeriod, selectedEpoch].filter(x => x)
    const next = getTimespan(periods, sels)
    const SelTimespan = (name) => {
        return (
            <span className="promptNextTimespan">
                Select {name} &nbsp;
                <FontAwesomeIcon icon={faHandPointDown} />
            </span>
        )
    }
    if (next && next.children && next.children.length > 0) {
        if (!selectedEon) return SelTimespan('eon')
        if (!selectedEra) return SelTimespan('era')
        if (!selectedPeriod) return SelTimespan('period')
        if (!selectedEpoch) return SelTimespan('epoch')
    }
}
