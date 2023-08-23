import * as THREE from 'three'

export class GObject {
    constructor() {
        this.group = new THREE.Group()
        this.color = 0xff0000
    }
    select(yes = true) {
        this.group.visible = true
        // set the color of the lines to be brighter
        this.group.children.forEach(child => {
            child.material.color.set(yes ? 0xffff00 : this.color);
        })
    }
    static interpolatePoints(start, end, numberOfPoints = 10) {
        var points = [];

        for (let i = 0; i <= numberOfPoints; i++) {
            let fraction = i / numberOfPoints;
            let newLat = start.lat * (1 - fraction) + end.lat * fraction;
            let newLong = start.long * (1 - fraction) + end.long * fraction;

            points.push({
                lat: newLat,
                long: newLong
            });
        }

        return points;
    }
    static latLongToVector3(lat, lon, radius, height, f) {
        const phi = lat * Math.PI / 180
        const theta = (lon - 180) * Math.PI / 180

        const x = -(radius + height) * Math.cos(phi) * Math.cos(theta) * f
        const y = (radius + height) * Math.sin(phi) * f
        const z = (radius + height) * Math.cos(phi) * Math.sin(theta) * f

        return new THREE.Vector3(x, y, z)
    }
}
