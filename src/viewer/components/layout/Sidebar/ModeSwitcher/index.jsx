// Create a react component LayerManager that displays a list of layers.
//
import React from "react";

function ModeSwitcher(props) {
    const { layers = [], handleAddLayer } = props
    // Make the list unique
    const sortByName = (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0

    return (
        <div id="modeSwitcher">
            <div>FIRST</div>
            <div>LAST</div>
        </div>
    )
}

export default ModeSwitcher;
