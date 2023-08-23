import React from 'react';

import { PanelCollapsible } from '../../base/Panel';

import './CommandLine.css';

function CommandLine() {
    const submitCommand = (event) => {
        if (event.key === 'Enter') {
            // Handle the command submission
        }
    };

    const toggleTextArea = () => {
        // Implement toggle functionality
    };

    return (
        <PanelCollapsible id="commandLine" direction="south" fullWidth="150">
            <div id="commandInput">
                <input
                    list="commands"
                    type="text"
                    style={{ width: '100%' }}
                    placeholder="Type your command here..."
                    onKeyPress={submitCommand}
                />
                <datalist id="commands">
                    <option value="listLayers"></option>
                    <option value="getLayer"></option>
                </datalist>
                <button id="toggleButton" onClick={toggleTextArea}>Toggle Text Area</button>
            </div>
            <div id="commandArea"></div>
        </PanelCollapsible>
    );
}

export default CommandLine;
