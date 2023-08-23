import React from "react"
import chroma from 'chroma-js';
import { getTimespan, periods } from '../lib/geological-time-chart';

import './BreadCrumb.css'

const BreadCrumb = ({
    name, selected, selections
}) => {
    const {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
        setSelectedEon, setSelectedEra, setSelectedPeriod, setSelectedEpoch
    } = selections

    const deselectChildren = (level) => {
        switch (level) {
            case 'eon': setSelectedEon(null)
            case 'era': setSelectedEra(null)
            case 'period': setSelectedPeriod(null)
            case 'epoch': setSelectedEpoch(null)
            default: break;
        }
    }

    if (!selected) return (
        <span class="breadCrumb">
            <b>/</b>
            <span className='dots'>...</span>
        </span>
    )

    const path = []
    switch (name) {
        case 'epoch': path.push(selectedEpoch)
        case 'period': path.push(selectedPeriod)
        case 'era': path.push(selectedEra)
        case 'eon': path.push(selectedEon)
        default: break
    }

    const { color } = getTimespan(periods, path.reverse())
    return (
        <span class="breadCrumb">
            <b>/</b>
            <span
                onClick={() => deselectChildren(name)}
                style={{
                    backgroundColor: chroma(color).darken().saturate(2).hex(),
                    border: '2px solid ' + chroma(color).darken(2).hex(),
                }}>{
                    selected
                }</span>
        </span>
    )
}

export default BreadCrumb
