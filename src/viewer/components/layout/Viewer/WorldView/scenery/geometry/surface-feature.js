import * as THREE from 'three'
import { GObject } from './g-object'

export class GSurfaceFeature extends GObject {
    // Interpolation will give a smoother render but will cost more in resources
    // and user experience
    static interpolate = false
    static numPointsGenerated = 0

    constructor(featureData, layers = [], radius, scale = 0.01) {
        super()
        this.coordinates = featureData.geometry.coordinates
        // extract the layer name from the uri
        const uri = featureData.properties.uri
        const layer = uri.split('/')[5]
        this.color = layers.filter(l => l.name === layer).shift().color
        this.radius = radius
        this.scale = scale
        this.draw(this.radius)
    }

    draw(radius) {
        // Interpolate points on the sphere surfacesc

        let numPoints = 0
        this.coordinates
            .map(x => ({ lat: x[1], long: x[0] }))
            .forEach((point, i, lst) => {
                if (i === lst.length - 1) return;
                const { interpolatePoints, latLongToVector3 } = GObject

                let points = []
                const from = point;
                const to = lst[i + 1]
                if (GSurfaceFeature.interpolate) {
                    const interpolatedPoints = interpolatePoints(from, to)
                    points = interpolatedPoints.map(point => latLongToVector3(point.lat, point.long, radius, 0.02, 1))
                    numPoints += interpolatedPoints.length
                } else {
                    points = [
                        latLongToVector3(from.lat, from.long, radius, 0.01, 1),
                        latLongToVector3(to.lat, to.long, radius, 0.01, 1),
                    ]
                    numPoints += 2
                }

                // Convert lat-long points to 3D coordinates
                // Create a geometry and add all the points to it
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                // Create a red line material
                const material = new THREE.LineBasicMaterial({ color: this.color });

                // Create a line and add it to a sphere
                const line = new THREE.Line(geometry, material)
                this.group.add(line)
            })
        GSurfaceFeature.numPointsGenerated += numPoints
        return this.group
    }
}
