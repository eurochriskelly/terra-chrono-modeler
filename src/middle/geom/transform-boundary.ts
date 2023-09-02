import * as turf from '@turf/turf'
import { center, point } from 'turf'



/**
 * Calculate the length of a polygon.
 */
const perimeterLength = (
    points: number[][]
) => {
    const distance3D = (p1: number[], p2: number[]) => {
        const [x1, y1, z1] = p1;
        const [x2, y2, z2] = p2;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
    };
    let length = 0;
    for (let i = 0; i < points.length; i++) {
        const nextIndex = (i + 1) % points.length;
        length += distance3D(points[i], points[nextIndex]);
    }
    return length;
};


const translateAlongGreatCircle = (
    radius: number,
    p1: number[],
    p2: number[],
    factor: number
) => {
    // Step 1: Normalize p1 and p2 to unit vectors
    const norm1 = Math.sqrt(p1[0] ** 2 + p1[1] ** 2 + p1[2] ** 2);
    const norm2 = Math.sqrt(p2[0] ** 2 + p2[1] ** 2 + p2[2] ** 2);

    const unit1 = [p1[0] / norm1, p1[1] / norm1, p1[2] / norm1];
    const unit2 = [p2[0] / norm2, p2[1] / norm2, p2[2] / norm2];

    // Step 2: Calculate Δp = p2 - p1
    const delta = [unit2[0] - unit1[0], unit2[1] - unit1[1], unit2[2] - unit1[2]];

    // Step 3: Calculate p3 = p1 + Δp × factor
    const p3 = [unit1[0] + delta[0] * factor, unit1[1] + delta[1] * factor, unit1[2] + delta[2] * factor];

    // Step 4: Normalize p3 to a unit vector
    const norm3 = Math.sqrt(p3[0] ** 2 + p3[1] ** 2 + p3[2] ** 2);
    const unit3 = [p3[0] / norm3, p3[1] / norm3, p3[2] / norm3];

    // Step 5: Scale p3 by the radius
    const scaledP3 = [unit3[0] * radius, unit3[1] * radius, unit3[2] * radius];

    return scaledP3;
}


/**
 * Convert geographic coordinates to cartesian coordinates.
 */
const convertGeoToCartesian = (
    boundary : number[][],
    radius: number
) => {
    return boundary.map(([lon, lat]) => {
        const lonRad = (Math.PI / 180) * lon;
        const latRad = (Math.PI / 180) * lat;

        const x = radius * Math.cos(latRad) * Math.cos(lonRad);
        const y = radius * Math.cos(latRad) * Math.sin(lonRad);
        const z = radius * Math.sin(latRad);

        return [x, y, z]
    })
}


/**
 * Convert cartesian coordinates to geographic coordinates.
 */
const convertCartesianToGeo = (
    cartesianPoints: number[][],
    radius: number
) => cartesianPoints.map(([x, y, z]) => {

    const latRad = Math.asin(z / radius);
    const lonRad = Math.atan2(y, x);

    const lat = (180 / Math.PI) * latRad;
    const lon = (180 / Math.PI) * lonRad;

    return [lon, lat];
})

export const transformBoundary = (
    gpRegion: any,
    initialRadius: number,
    finalRadius: number
) => {
    const boundary = convertGeoToCartesian(
        gpRegion.geometry.coordinates[0],
        initialRadius
    )
    const scaledBoundary = []
    const centroidFinal = [0, 0, 0]
    const centroidInitial = [0, 0, 0]
    for (let point of boundary) {
        let [x, y, z] = point;
        let length = Math.sqrt(x * x + y * y + z * z)
        let scaled = [(x / length) * finalRadius, (y / length) * finalRadius, (z / length) * finalRadius]
        scaledBoundary.push(scaled)
        centroidFinal[0] += scaled[0]
        centroidFinal[1] += scaled[1]
        centroidFinal[2] += scaled[2]
        centroidInitial[0] += x
        centroidInitial[1] += y
        centroidInitial[2] += z
    }

    centroidFinal[0] /= boundary.length
    centroidFinal[1] /= boundary.length
    centroidFinal[2] /= boundary.length

    centroidInitial[0] /= boundary.length
    centroidInitial[1] /= boundary.length
    centroidInitial[2] /= boundary.length

    const stretchedBoundary = scaledBoundary.map(point => {
        return translateAlongGreatCircle(finalRadius, centroidFinal, point, initialRadius/finalRadius)
    })

    return {
        ratio: initialRadius / finalRadius,
        boundaries: {
            orig: {
                centroid: {
                    lonlat: convertCartesianToGeo([centroidInitial], initialRadius)[0],
                    xyz: centroidInitial
                },
                points: boundary,
                perimeterLength: perimeterLength(boundary)
            },
            stretched: {
                centroid: {
                    lonlat: convertCartesianToGeo([centroidFinal], finalRadius)[0],
                    xyz: centroidFinal
                },
                points: stretchedBoundary,
                perimeterLength: perimeterLength(stretchedBoundary)
            }
        },
        result: convertCartesianToGeo(stretchedBoundary, finalRadius)
    }
}




const boundary = [[-123.1, 49.3], [-70.2, 43.6], [2.3, 48.8], [103.8, 1.3]];
const radius = 3000;
const cartesianCoords = convertGeoToCartesian(boundary, radius);

console.log(cartesianCoords);
