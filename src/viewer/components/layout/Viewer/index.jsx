import React from "react";
import MapView from './MapView';
import WorldView from './WorldView';
//import CesiumView from './CesiumView';
// import SculptView from './SculptView';

import LoadingScreen from '../../base/Interface/LoadingScreen'

import './Viewer.css';

function Viewer(props) {
    const { gestate } = props
    const { mode } = gestate
    const GetView = () => {
        switch (mode) {
            // Flat map view
            case 'flat': return <MapView {...props} />

            // Round world view
            case 'round':
            case 'world': return <WorldView {...props} />

            // Fully featured cesium viewer
            case 'advanced':
            case 'cesium':
                return (
                    <div id="cesium">
                        <div id="cesiumContainer" />
                        {/* <CesiumView {...props} /> */}
                    </div>
                )

            // Sculpting view
            case 'sculpt':
            case 'grow': return <div />
                //<SculptView {...props} />

            // R3F Sandbox
            case 'r3f':
                return <div id="r3f">R3F</div>

            default:
                return <LoadingScreen expectedMode={props.gestate.mode} />
        }
    }
    return <div id="viewer"><GetView /></div>
}

export default Viewer;
