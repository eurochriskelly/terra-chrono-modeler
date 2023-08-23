/*
 * GEState:
 * - Epoch state data shared between 2d and 3d views
 *
 */
import { DataSync } from './data-sync'

class GEStateData {
    constructor(ds) {
        this.ds = ds
    }
    toggleBackdrop(name) {
        this.backdrops.forEach(b => {
            if (b.name === name) {
                console.log('Toggling backdrop', b.name)
                b.on = !b.on
            }
        })
    }
    async intialize() {
        const {
            state, epochs, backdrops, features
        } = await this.ds.retrieveData()
        this.gestate = state
        this.backdrops = backdrops
        this.features = features
        this.epochs = epochs
    }
};

const GEState = (function (ds) {
    //
    let instance;
    async function createInstance() {
        // Your singleton logic here
        const ds = new DataSync()
        const GES = new GEStateData(ds)
        await GES.intialize()
        return GES
    }
    return {
        getInstance: async function () {
            if (!instance) {
                instance = await createInstance()
            }
            return instance;
        }
    }
})()

export default GEState;
