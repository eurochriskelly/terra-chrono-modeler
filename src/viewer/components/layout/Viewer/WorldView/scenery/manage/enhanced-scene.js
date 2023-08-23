import * as THREE from 'three'
/*
 * Wrapper to add some functionality to the THREE.Scene class for our needs
 */
export class EnhancedScene extends THREE.Scene {
    constructor(scene) {
        super()
    }
    printSceneStats() {
        console.log('Printing scene stats ...')
        // should be able to work entirely staticly
        let numGeometries = 0;
        let numMaterials = 0;
        let numTextures = 0;
        let numObjects = 0;
        if (!this) return

        this.traverse((node) => {
            // Count objects
            if (node instanceof THREE.Object3D) {
                numObjects++;
            }

            // Count geometries
            if (node instanceof THREE.Mesh) {
                numGeometries++;
            }

            // Count materials and textures
            if (node.material) {
                numMaterials++;

                if (node.material.map) {
                    numTextures++;
                }

                // Check for additional textures in materials, like bumpMap, normalMap, etc.
                if (node.material.bumpMap) {
                    numTextures++;
                }
                if (node.material.normalMap) {
                    numTextures++;
                }
                if (node.material.specularMap) {
                    numTextures++;
                }
                if (node.material.envMap) {
                    numTextures++;
                }
            }
        });

        console.log('Number of Objects: ' + numObjects);
        console.log('Number of Geometries: ' + numGeometries);
        console.log('Number of Materials: ' + numMaterials);
        console.log('Number of Textures: ' + numTextures);
    }
}
