import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { bus } from './event-bus'

const layerToFeature = new Map();

export class EpochFlatView {
    //
    constructor(GES) {
        console.log('EpochFlatView constructor')
        this.ges = GES
        const map = L.map('map', {
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0,
            minZoom: 1,
            maxZoom: 13,
            worldCopyJump: false
        }).setView([0, 0], 1);
        map.setZoom(3)
        window.map = map
        this.ges.backdrops.forEach(b => {
            this.setBackground(b)
        })
        console.log('EpochFlatView constructor done')
        if (this.ges.layers && this.ges.layers.data) {
            this.ges.layers.data.forEach(this.draw)
        } else {
            console.log('no data')
        }
    }

    setBackground(options) {
        const { image, bounds, opacity = 0.5 } = options
        L.imageOverlay(
            image,
            bounds,
            { opacity }
        ).addTo(window.map);
        this.setupDrawingControls(window.map)
    }

    //
    setupDrawingControls(map) {


    }

    draw(d) {

    }
}
