import React, { useEffect, useState } from 'react'
import GEState from './classes/ge-state'
import { logMaker } from './common/logging'
// import { CommandHandler } from './classes/command-handler'

import Sidebar from './components/layout/Sidebar'
import Viewer from './components/layout/Viewer'
import CommandLine from './components/layout/CommandLine'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'

const ii = logMaker('App.jsx', 'ii');

var GES = {};

function App() {
    ii(`Initializing App...`)
    const [backdrops, setBackdrops] = useState([]);
    const [epochs, setEpochs] = useState([]);
    const [features, setFeatures] = useState([]);
    const [layers, setLayers] = useState([]);
    const [gestate, setGestate] = useState({});

    useEffect(() => {
        async function initialize() {
            GES = await GEState.getInstance();
            setGestate(GES.gestate);
            setEpochs(GES.epochs);
            setBackdrops(GES.backdrops);
            setFeatures(GES.features);
            setLayers(GES.gestate.layers);
            //new CommandHandler(EFV);
        }
        initialize();
    }, []);

    const common = {
        mode: 'flat',
        backdrops, gestate, epochs, features,
        layers: gestate.layers,
        handleAddEpoch: (epoch) => {
            ii('handleAddEpoch', epoch)
            const EARTH_RADIUS = 6371
            const newEpochs = [
                ...epochs,
                {
                    id: `e${epochs.length + 1}`,
                    name: epoch, on: false,
                    mya: 0, radius: EARTH_RADIUS
                }
            ]
            console.log(newEpochs)
            setEpochs(newEpochs)
            GES.syncData({ epochs: newEpochs })
        },
        handleModeChange: (mode) => {
            ii('handleModeChange', mode);
            console.log('GESTATE', GES.gestate)
            setGestate({...GES.gestate, mode: mode })
        },
        handleAddLayer: (layer) => {
            ii('handleAddLayer', layer);
            const { layers } = GES.gestate;
            const newLayers = [
                ...layers,
                {
                    id: `l${layers.length + 1}`,
                    name: layer,
                    color: 'white',
                    on: true,
                }
            ]
            // console.log(newLayers)
            setLayers(newLayers);
            GES.ds.syncData({ layers: newLayers }); // no need to wait. use memory version
        },
        toggleBackdrop: (id) => {
            GES.toggleBackdrop(id);
            // Update the backdrops state after toggling
            setBackdrops([...GES.backdrops]);
        },
        toggleLayer: (id) => { }
    }
    return (
        <div className="grid-container bg-blue-500">
            <Sidebar {...common} />
            <Viewer {...common} />
            <CommandLine {...common} />
        </div>
    );
}

export default App;
