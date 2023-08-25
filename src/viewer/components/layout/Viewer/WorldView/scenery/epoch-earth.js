import * as THREE from 'three'
import { SceneInfo } from './manage/scene-info'

const ii = msg => console.log(`[EpochEarth] ${msg}`)

/**
 * Goal hierarchy for the EpochEarth visualization:
 *
 * - EpochEarth
 *   - GGlobe : The sphere and it's geometry
 *     - GGrid
 *     - GRegions
 *      - GSurfaceFeature
 *   - SceneManager
 *     - CameraMan
 *     - SceneDirector
 *   - DataManager
 *     - EpochManager
 */

class EpochEarthBase {
    constructor(config) {
        this.config = config
    }

    cycleEpoch(n) {
        // Cycle to the next epoch
        const newEpochId = this.epochId + n;
        if (newEpochId >= 3) {
            return
        }
        if (newEpochId < 0) {
            return
        }
        this.epochId += n;
    }
}

export class EpochEarth extends EpochEarthBase {
    static ready = false
    constructor(
        scene, camera, renderer,
        world, size
    ) {
        // Assign data objects
        super(world)
        console.log('creating the world')

        // Reference scene artifacts
        this.scene = scene
        this.camera = camera
        this.renderer = renderer

        // Set window sizes
        this.width = size.width
        this.height = size.height

        // Initialize the regions array so we can select objects
        this.sceneInfo = new SceneInfo(scene, world)
    }

    update({ layers, epochs, features, gestate }) {
        // Geometry for the other planet
        this.sceneInfo.updateEpoch(epochs, gestate.epoch)
        this.sceneInfo.updateGlobe()
        this.sceneInfo.updateFeatures(features, layers)
        this.sceneInfo.updateGrid(layers)
        this.clipView()
    }

    set appearance(mode) {
        const { sphere } = this.sceneInfo
        if (!sphere) {
            ii('No sphere found')
            return
        }
        ii(`Setting appearance to ${mode}`)
        if (mode == 'edit') {
            sphere.material.opacity = 0.8
            // make the color of the sphere white
            sphere.material.color.set(0xdddddd)
        } else {
            sphere.material.opacity = 0.85
            sphere.material.color.set(0x001100)
        }
        sphere.material.needsUpdate = true;
        this.scene.printSceneStats()
    }

    clipView() {
        const centerOfEarth = new THREE.Vector3(0, 0, 0);
        const pointOnEquator = new THREE.Vector3(1, 0, 0);
        const northPole = new THREE.Vector3(-1, 1, 0);

        // Define the normal of the plane by taking the cross product of two vectors lying on the plane
        const normal = new THREE.Vector3().crossVectors(
            new THREE.Vector3().subVectors(pointOnEquator, centerOfEarth),
            new THREE.Vector3().subVectors(northPole, centerOfEarth)
        ).normalize();

        // Create a clipping plane
        const clipPlane = new THREE.Plane(normal, 0);

        // Apply the clipping plane to the renderer
        this.renderer.clippingPlanes = [clipPlane];
    }

    next() {
        console.log('Cycling next epoch')
        this.cycleEpoch(1)
        this.updateEpoch()
    }
    prev() {
        console.log('Cycling previous epoch')
        super.cycleEpoch(-1)
        this.updateEpoch()
    }
}
