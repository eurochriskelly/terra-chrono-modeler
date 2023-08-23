/*
 * A vi-style interaction system for the Epoch Earth visualization
 *
 */
import * as THREE from 'three';
import { logMaker } from '../../../../../../common/logging'

const ii = logMaker('ESceneInteract', 'ii')

const MODES = {
    NAVIGATION: 'NAVIGATION',
    EDITING: 'EDITING'
};

const DRAG_SENSITIVITY = 0.005;

export class ESceneInteract {
    constructor() {
        // Create teh object for reference
    }
    setup(epochEarthInstance, handlers) {
        if (!this.initialized) {
            this.epochEarthInstance = epochEarthInstance
            this.handlers = handlers
            this.processingKey = false;
            this.ROT = 0.3;
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.isDragging = false;
            this.previousMousePosition = {
                x: 0,
                y: 0
            };

            /// Start in naviation (basic) mode
            this.currentMode = MODES.NAVIGATION; // default mode

            // Set the initial camera position
            this.epochEarthInstance.scene.rotation.y = -80 * Math.PI / 180;
            this.epochEarthInstance.scene.rotation.x = -10 * Math.PI / 180;

            // Bind 'this' context to event handlers
            this.handleKeyUp = this.handleKeyUp.bind(this);
            this.onMouseClick = this.onMouseClick.bind(this);
            this.onMouseWheel = this.onMouseWheel.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);

            // Add event listeners
            document.addEventListener('keyup', this.handleKeyUp);
            document.addEventListener('click', this.onMouseClick, false);
            document.addEventListener('wheel', this.onMouseWheel, false);
            document.addEventListener('mousemove', this.onMouseMove, false);
            document.addEventListener('mousedown', this.onMouseDown, false);
            document.addEventListener('mouseup', this.onMouseUp, false);
            this.initialized = true
        }
    }

    onMouseClick(event) {
        if (this.currentMode !== MODES.EDITING) return

        const { width, height, scene, camera } = this.epochEarthInstance

        // Convert the mouse position to normalized device coordinates (-1 to +1) for both components
        this.mouse.x = (event.clientX / width) * 2 - 1
        this.mouse.y = - (event.clientY / height) * 2 + 1

        // Update the picking ray with the camera and the mouse position
        this.raycaster.setFromCamera(this.mouse, camera)

        // Calculate the objects that intersected with the ray
        scene.remove(this.epochEarthInstance.rings)
        let intersects = this.raycaster.intersectObjects(this.epochEarthInstance.scene.children, true)
        // intersects = intersects.slice(0, 40)

        for (let i = 0; i < intersects.length; i++) {
            // Filter out certain geometries
            if (intersects[i].object.parent === this.epochEarthInstance.rings) {
                continue;
            }

            if (intersects[i].object.geometry instanceof THREE.EllipseCurve ||
                intersects[i].object.geometry instanceof THREE.SphereGeometry) {
                continue;  // Skip the current iteration if the object is a Circle or Sphere
            }

            // Modify the material color of the object
            intersects[i].object.material.color.set(0xffff00);
            // Exit the loop after the first match
            // break;
        }
        scene.add(this.epochEarthInstance.rings)
    }

    onMouseWheel(event) {
        const delta = event.deltaY;
        if (delta > 0) {
            this.epochEarthInstance.camera.position.z += 1;
            this.ROT *= 1.5
        } else {
            this.epochEarthInstance.camera.position.zzzz -= 1;
            this.ROT *= 0.6666666667
        }
    }

    static keyIs(event, k) {
        if (!k) return false
        const codes = {
            LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40,
            PAGE_UP: 33, PAGE_DOWN: 34,
            ESC: 27,
            // Only one set of codes for alphabetical keys,
            // since upper and lower have the same keyCode
            A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72,
            I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80,
            Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
            Y: 89, Z: 90,

            a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72,
            i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80,
            q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88,
            y: 89, z: 90,

            movements: {
                ROT_LEFT: 55,
                ROT_RIGHT: 56,
            }
        }

        const isUpperCase = (str) => str === str.toUpperCase();
        const isLowerCase = (str) => str === str.toLowerCase();
        const isControlKey = (str) => str.startsWith('^');
        const isAlphaNumeric = (str) => /^[a-zA-Z]$/.test(str);

        let key = k;
        if (isControlKey(k)) {
            key = k.substring(1).toUpperCase();
        }

        const keyCode = codes[key];

        if (!keyCode) return false;

        if (isControlKey(k)) {
            return event.ctrlKey && event.keyCode === keyCode;
        }

        if (isAlphaNumeric(k)) {
            if (isUpperCase(k)) {
                return event.shiftKey && event.keyCode === keyCode;
            }
            if (isLowerCase(k)) {
                return !event.shiftKey && event.keyCode === keyCode;
            }
        }

        return event.keyCode === keyCode;
    }

    handleKeyUp(event) {
        const keyIs = ESceneInteract.keyIs.bind(null, event)
        const whenKey = (key, fn) => {
            if (keyIs(key)) {
                ii(`Detected [${key}]. Rot speed [${this.ROT.toFixed(2)}]`)
                return fn()
            }
        }
        const { scene, camera, next, prev } = this.epochEarthInstance
        const { setIsEditing, pickFeature } = this.handlers

        if (!this.processingKey) {
            this.processingKey = true

            if (keyIs('PAGE_UP')) next();
            if (keyIs('PAGE_DOWN')) prev()

            if (keyIs('S')) this.ROT *= event.shiftKey ? 0.75 : 1.333
            if (keyIs('R')) {
                // reset everything
                this.ROT = 0.3
                this.camera.position.x = 0
                this.camera.position.y = 0
                this.camera.position.z = 34
            }

            if (keyIs('ESC')) {
                console.log('Switching to navigation mode')
                this.currentMode = MODES.NAVIGATION;
                setIsEditing(false)
            }

            // Pressing 'e', 'a', 'i' switches to editing/insert mode
            if (['e', 'a', 'i'].some(keyIs)) {
                console.log('switching to editing mode')
                this.currentMode = MODES.EDITING;
                setIsEditing(true)
            }

            // handle all navigation only commands here
            if (this.currentMode === MODES.NAVIGATION) {
                //if (keyIs('T')) scene.rotation.z -= this.ROT;
                //if (keyIs('t')) scene.rotation.z += this.ROT;

                whenKey('LEFT', () => scene.rotation.y -= this.ROT)
                if (keyIs('RIGHT')) scene.rotation.y += this.ROT
                if (keyIs('DOWN')) scene.rotation.x += this.ROT
                if (keyIs('UP')) scene.rotation.x -= this.ROT

                if (keyIs('Z')) camera.position.z += 1
                if (keyIs('z')) camera.position.z -= 1
            }

            // handle all editing only commands here
            if (this.currentMode === MODES.EDITING) {
                if (keyIs('n')) pickFeature('n')
                if (keyIs('p')) pickFeature('p')
            }

            this.processingKey = false
        }
    }

    onMouseDown(event) {
        this.isDragging = true;
    }

    onMouseUp(event) {
        this.isDragging = false;
    }

    onMouseMove(event) {
        if (this.isDragging && this.currentMode === MODES.NAVIGATION) {
            const deltaMove = {
                x: (event.offsetX - this.previousMousePosition.x) * DRAG_SENSITIVITY,
                y: (event.offsetY - this.previousMousePosition.y) * DRAG_SENSITIVITY
            };

            this.epochEarthInstance.scene.rotation.y += deltaMove.x;
            this.epochEarthInstance.scene.rotation.x += deltaMove.y;

            // Limit the rotation so that it doesn't flip the globe upside down
            this.epochEarthInstance.scene.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.epochEarthInstance.scene.rotation.x));
        }

        this.previousMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
    }
}
