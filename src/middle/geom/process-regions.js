import { transformCurvedSurface } from "./transform-curved-surface";


// Load GeoJSON (either from file or API)
const processRegion = (epoch) => {
    // loop over all regions in the epoch and process them
    const regionBoundary = turf.geometry('your-geojson-feature-or-geometry');
}

/**
 *
 * Pass a triangulated mesh surface and a radius to transform multiple surfaces
 */
export const multiSurfaceTransform = (geojson, fromRadius, toRadius, stepSize) => {

}
