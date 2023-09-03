import React, { useEffect } from "react";
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { bus } from "../../../../classes/event-bus";
import GEState from "../../../../classes/ge-state";

import "./MapView.css";

var GES = {};
const layerToFeature = new Map();

function MapView(props) {
    const { backdrops = [], features = [], layers = [], gestate } = props;

    useEffect(() => {
        async function initialize() {
            GES = await GEState.getInstance();
        }
        initialize();
        console.log('gestate', gestate)
        const { center, zoom } = gestate
        const map = L.map('map', {
            // ... other map options
        }).setView(center, 1);
        if (map) map.setZoom(zoom);
        window.map = map;

        // Clear existing overlays before adding new ones
        map.eachLayer((layer) => {
            console.log('layer is', layer)
            if (layer instanceof L.ImageOverlay) {
                map.removeLayer(layer);
            }
        });

        // Draw layers
        features.forEach(draw.bind(null, layers))

        // Set up drawing controls
        setupDrawingControls(window.map, gestate)

        return () => {
            map.off();
            map.remove();
        };
    }, [features]);

    useEffect(() => {
        // remove backgrounds from map before proceeding
        window.map.eachLayer((layer) => {
            if (layer instanceof L.ImageOverlay) {
                window.map.removeLayer(layer);
            }
        });
        // Update only backdrops
        backdrops.forEach(setBackground)
    }, [backdrops]);

    const showProps = (e) => {
        console.log('props', props)
    }
    return <div id="map" onClick={showProps}></div>;
}

export default MapView;

function setBackground(options) {
    const { image, bounds, opacity = 0.5, on } = options
    if (on) {
        L.imageOverlay(
            image,
            bounds,
            { opacity }
        ).addTo(window.map);
    }
}

function setupDrawingControls(map, gestate) {
    // Event listener for map click
    map.on('click', function (e) {
        let latLng = map.mouseEventToLatLng(e.originalEvent);
        console.log(latLng);
    });
    map.pm.addControls({
        position: 'topright',
        drawCircle: false,
        drawCircleMarker: false,
        drawRectangle: false,
        drawText: false,
        cutLayer: false,
    });

    map.on('pm:create', (e) => {
        const res = e.layer.toGeoJSON()
        console.log(gestate)
        const layer = { name: gestate.layer }
        GES.ds.storeData(gestate.epoch, layer, res)
    });
    map.on('pm:remove', e => {
        // Get the feature associated with this layer
        let feature = layerToFeature.get(e.layer);
        // The feature's properties are now available
        if (feature) {
            bus.emit('deleteDoc', {
                uri: feature.properties.uri
            })
        }
    });
}

function draw(layers, d) {
    const thisLayer = d.properties.uri.split('/')[5]
    const layCol = layers.filter(l => l.name === thisLayer)[0].color;
    //
    L.geoJSON(d, {
        style: {
            color: layCol,
            weight: 2,
            opacity: 1
        },
        onEachFeature: function (feature, layer) {
            // Add this layer and feature to the map
            layerToFeature.set(layer, feature);

            // Here you can add event handlers and interaction to your layers.
            layer.on('click', function (e) {
                const currentColor = layer.options.color;
                const selected = currentColor === '#FFFF00'
                const newColor = selected ? layCol : '#FFFF00';
                const weight = selected ? 2 : 6;
                layer.setStyle({
                    color: newColor,
                    weight,
                });
                console.log(feature.properties.uri)
            });
        }
    }).addTo(window.map);
}
