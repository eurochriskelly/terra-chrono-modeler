import * as THREE from 'three';
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
import { generateGridLines } from '../geometry/grid-lines';
import { GSurfaceFeature } from '../geometry/surface-feature';

const ii = msg => console.log(`[SceneInfo] ${msg}`)

export class SceneInfo {
    static globeCounter = 0
    constructor(scene, world) {
        this.scene = scene
        this.world = world
        this.sphere = null
        this.rings = null
        this.features = null
        this.collections = null

        // stored geometry
        this.regions = []
        this.featureGroup = null

        this.epochId = 0
        this.radius = 6371 * world.SCALE_FACTOR
    }
    updateEpoch(epochs, epoch) {
        this.epochInfo = epochs.filter(e => e.id === epoch).shift()
        const { radius } = this.epochInfo
        this.radius = radius * this.world.SCALE_FACTOR
    }
    updateGlobe() {
        if (!this.sphere) {
            ii('Setting up sphere: ' + SceneInfo.globeCounter)
            // Initialize geometrySphere and sphere before calling updateEpoch
            var geometrySphere = new SphereGeometry(this.radius, 32, 32)
            var materialSphere = new MeshBasicMaterial({
                color: 0x001100, wireframe: false,
                // opacity: 0.85, transparent: false
            })
            this.sphere = new Mesh(geometrySphere, materialSphere);
            this.scene.add(this.sphere)
            SceneInfo.globeCounter++
        }
    }
    updateGrid() {
        // Generate the grid lines for the sphere
        if (!this.rings) {
            ii('Setting up grid lines')
            this.rings = generateGridLines({ radius: this.radius * 1.01 })
            this.scene.add(this.rings)
        }
        /*
            // Remove all existing lines from the sphere
            for (let i = this.sphere.children.length - 1; i >= 0; i--) {
                const child = this.sphere.children[i];
                if (child instanceof THREE.Line) {
                    this.sphere.remove(child)
                }
            }
        */
    }
    updateCollections(collections) {
        // TODO : implement
        console.log('todo: implement updateCollections')
    }
    updateFeatures(features, layers) {
        // Assuming each epoch has a regions array
        if (!this.featureGroup) {
            ii('Setting up features')
            this.featureGroup = new THREE.Group()
            GSurfaceFeature.interpolate = false
            features
                .filter(f => f.geometry.type === 'LineString')
                .filter(f => {
                    const epoch = f.properties.uri.split('/')[3]
                    return epoch === this.epochInfo.id
                })
                .forEach(f => {
                    const r = new GSurfaceFeature(f, layers, this.radius, this.world.SCALE_FACTOR)
                    this.regions.push(r)
                    this.featureGroup.add(r.group)
                })
            this.scene.add(this.featureGroup)
            ii(`Generated total [${GSurfaceFeature.numPointsGenerated}] points in mode [${GSurfaceFeature.interpolate ? 'interpolate' : 'no-interpolate'}]`)
            GSurfaceFeature.numPointsGenerated = 0
            this.scene.printSceneStats()
        }
    }
}
