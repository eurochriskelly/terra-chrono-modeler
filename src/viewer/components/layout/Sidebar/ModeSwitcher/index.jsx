// Create a react component LayerManager that displays a list of layers.
//
import React from "react";

import "./ModeSwitcher.css";

function ModeSwitcher(props) {
    const { handleModeChange } = props
    const { mode } = props.gestate
    console.log('ModeSwitcher', mode)
    return (
        <div id="modeSwitcher">
            <span>
                <input type="radio" id="flat" name="mode"
                    value="flat" checked={mode === 'flat'}
                    onChange={() => props.handleModeChange('flat')} />
                <label htmlFor="flat">Map</label>
            </span>
            <span>
                <input type="radio" id="world" name="mode" value="world" checked={mode === 'world'} onChange={() => props.handleModeChange('world')} />
                <label htmlFor="world">World</label>
            </span>
        </div>
    )
}

export default ModeSwitcher;
