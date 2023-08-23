// Create a react component LayerManager that displays a list of layers.
//
import React from "react";
import { DrilldownList } from "../../../base/List";

function LayerManager(props) {
    const { layers = [], handleAddLayer, gestate } = props
    // Make the list unique
    const sortByName = (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    const active = layers && layers
        .filter(x => x.name === gestate.layer)
        .map(layer => layer.id)
        .shift()
    console.log('active', active)
    return (
        <DrilldownList list={layers} handleAddItem={handleAddLayer} sorter={sortByName} active={active}>
            <div>foo</div>
        </DrilldownList>
    )
}



export default LayerManager;
