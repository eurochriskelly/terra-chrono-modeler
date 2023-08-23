import React from 'react';
import { DrilldownList } from '../../../base/List';
import './EpochSelector.css';

function EpochSelector(props) {
    const { epochs, handleAddEpoch } = props;
    return (
        <DrilldownList list={epochs} handleAddItem={handleAddEpoch}>
            <EpochDetails />
        </DrilldownList>
    )
}

function EpochDetails(props) {
    const gap = {
        minHeight: '10px'
    }
    return <div className="epochDetails">
        <div>
            <label>Period</label>
            <div>
                <input type="number" placeholder='100' />
                <span>MYA</span>
            </div>
        </div>
        <div>
            <label>Radius:</label>
            <div>
                <input type="number" placeholder='4000' />
                <span>Km</span>
            </div>
        </div>
    </div>
}

export default EpochSelector;
