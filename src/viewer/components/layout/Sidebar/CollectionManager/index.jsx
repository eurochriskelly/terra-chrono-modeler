// Create a react component LayerManager that displays a list of collections
//
import React from "react";
import { DrilldownList } from "../../../base/List";

function CollectionManager(props) {
    const { collections = [], handleAddLayer, gestate } = props
    // Make the list unique
    const sortByName = (a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    const active = collections && collections
        .filter(x => x.name === gestate.collection)
        .shift()
    console.log({
        collections,
        active,
    })
    return (
        <DrilldownList list={collections.slice(0, 5)} handleAddItem={handleAddLayer} sorter={sortByName} active={active}>
            <div>foo</div>
        </DrilldownList>
    )
}

export default CollectionManager;
