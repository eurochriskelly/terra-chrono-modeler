import Delaunator from 'delaunator'
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon'
// const proj4 = require('proj4') // if you opt for coordinate transformation


const addSteinerPoints = (regionBoundary, numberOfPoints = 100) => {
    let steinerPoints = [];
    const boundingBox = bbox(regionBoundary);

    for (let i = 0; i < numberOfPoints; i++) {
        // Generate a random point within the bounding box
        const randomPt = randomPoint(1, { bbox: boundingBox }).features[0].geometry.coordinates;

        // Check if the point is inside the polygon
        if (booleanPointInPolygon(randomPt, regionBoundary)) {
            steinerPoints.push(randomPt);
        }
    }
    return steinerPoints;
}

const boundaryToMesh = (regionBoundary) => {
    // Add Steiner Points to smooth the surface
    const steinerPoints = addSteinerPoints(regionBoundary)

    // Prepare a list combining boundary and Steiner points for triangulation
    const combinedPoints = regionBoundary.coordinates.concat(steinerPoints)

    // Perform Delaunay Triangulation
    const triangles = new Delaunator.from(combinedPoints).triangles

    // Remove triangles with centroids outside the boundary
    const filteredTriangles = []
    for (let i = 0; i < triangles.length; i += 3) {
        const triangleVertices = [
            combinedPoints[triangles[i]],
            combinedPoints[triangles[i + 1]],
            combinedPoints[triangles[i + 2]]
        ]

        // Calculate centroid of the triangle
        const centroid = turf.centroid(turf.polygon([triangleVertices]))

        if (booleanPointInPolygon(centroid.geometry.coordinates, regionBoundary)) {
            filteredTriangles.push(triangleVertices)
        }
    }
}

// Utility function
export const calculateSurfaceArea = (geojson) => {
    // todo
}

export const transformCurvedSurface = (regionBoundary, initialRadius, finalRadius) => {
    const mesh = boundaryToMesh(regionBoundary)
    // todo: transform meshed region to final radius and extract updated boundary
    return mesh
}
