import * as turf from '@turf/turf'
import Delaunator from 'delaunator'
// const proj4 = require('proj4') // if you opt for coordinate transformation

const { bbox, randomPoint, booleanPointInPolygon } = turf as any

const addSteinerPoints = (
    // first arg is a geojson polygon
    regionBoundary: number[][],
    numberOfPoints = 100
) => {
    let steinerPoints = [];
    const lstr = turf.lineString(regionBoundary)
    const boundingBox = bbox(lstr);
    for (let i = 0; i < numberOfPoints; i++) {
        // Generate a random point within the bounding box
        const randomPt = randomPoint(1, { bbox: boundingBox }).features[0].geometry.
            coordinates;
        // Check if the point is inside the polygon
        const res = booleanPointInPolygon(turf.point(randomPt), turf.polygon([regionBoundary]))
        if (res) {
            steinerPoints.push(randomPt);
        }
    }
    return steinerPoints.concat(regionBoundary)
}

const boundaryToMesh = (
    regionBoundary: any
) => {
    // Add Steiner Points to smooth the surface
    const meshPoints = addSteinerPoints(regionBoundary.geometry.coordinates[0])
    // Perform Delaunay Triangulation
    const { triangles } = new Delaunator(meshPoints.flatMap(p => p))
    // Remove triangles with centroids outside the boundary
    const filteredTriangles = []
    for (let i = 0; i < triangles.length; i += 3) {
        const triangleVertices = [
            meshPoints[triangles[i]],
            meshPoints[triangles[i + 1]],
            meshPoints[triangles[i + 2]],
            meshPoints[triangles[i]],
        ]
        // Calculate centroid of the triangle
        const centroid = turf.centroid(turf.polygon([triangleVertices]))
        if (booleanPointInPolygon(centroid, regionBoundary)) {
            filteredTriangles.push(triangleVertices)
        }
    }
    return filteredTriangles
}

// Utility function
// - calculate the sum area of all triangles
export const calculateSurfaceArea = (
    meshTriangles: number[][][]
) => {
    return meshTriangles.reduce((acc, triangle) => {
        const triangleArea = turf.area(turf.polygon([triangle]))
        return acc + triangleArea
    }, 0)
}

export const transformCurvedSurface = (
    gpRegion: any,
    initialRadius: number,
    finalRadius: number
) => {
    // todo: transform meshed region to final radius and extract updated boundary
    const data = boundaryToMesh(gpRegion)
    return {
        area: calculateSurfaceArea(data),
        data
    }
}
