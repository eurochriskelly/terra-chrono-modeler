import * as THREE from 'three';

const getStyle = major => major
    ? { color: 0x777777, opacity: 0.2, transparent: true }
    : { color: 0xaaaaaa, opacity: 0.7, transparent: true }

export const generateGridLines = ({ radius = 6371 }) => {
    const lines = new THREE.Group();

    const segments = 128 // Number of segments for lines

    // Generate lines of latitude (parallels)
    // Inside the latitude for loop
    for (let lat = -80; lat <= 80; lat += 10) {
        const phi = THREE.MathUtils.degToRad(lat);
        const circleRadius = radius * Math.cos(phi);

        const curve = new THREE.EllipseCurve(
            0, 0,               // ax, aY
            circleRadius, circleRadius,      // xRadius, yRadius
            0, 2 * Math.PI,    // aStartAngle, aEndAngle
            false              // aClockwise
        );

        const path = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
        path.rotateX(Math.PI / 2);  // Rotate to make the circle horizontal
        path.translate(0, radius * Math.sin(phi), 0);  // Adjust the Y position based on latitude

        const style = getStyle(!!lat);
        const material = new THREE.LineBasicMaterial(style);
        lines.add(new THREE.LineLoop(path, material));
    }


    // Generate lines of longitude (meridians)
    for (let lon = -180; lon <= 180; lon += 10) {  // Interval of 10 degrees for demonstration
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let lat = -90; lat <= 90; lat += 2) {
            const phi = THREE.MathUtils.degToRad(90 - lat);
            const theta = THREE.MathUtils.degToRad(lon);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            vertices.push(x, y, z);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const style = getStyle(!!lon)
        const material = new THREE.LineBasicMaterial(style);
        lines.add(new THREE.Line(geometry, material));
    }

    return lines;
}
