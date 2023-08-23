import React, { useState } from 'react';
import BackdropDetails from './BackdropDetails';
import { DrilldownList } from '../../../base/List';

import './Backdrops.css';

function Backdrops(props) {
    const { backdrops = [], toggleBackdrop = () => { } } = props
    const [selected, setSelected] = useState(null);
    const [index, setIndex] = useState(null);

    const handleSelect = (n, event) => {
        const parentDiv = event.currentTarget;
        setIndex(n)
        if (selected) {
            selected.classList.remove('selected');
        }
        if (selected !== parentDiv) {
            parentDiv.classList.add('selected');
            setSelected(parentDiv);
        } else {
            setSelected(null);
        }
    }
    const handleCheckboxChange = (event, x) => {
        const { name } = event.target;
        toggleBackdrop(name)
    }
    return (
        <DrilldownList list={backdrops} handleCheckboxChange={handleCheckboxChange}>
            <BackdropDetails />
        </DrilldownList>
    );
}

export default Backdrops;
