import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EnhancedScene } from './scenery/manage/enhanced-scene';
import { WebGLRenderer, PerspectiveCamera } from 'three';
import { EpochEarth } from './scenery/epoch-earth';
import { ESceneInteract } from './scenery/manage/escene-interact';
import EpochFinder from './EpochFinder';

import './WorldView.css';

const ii = msg => console.log(`[WorldView] ${msg}`)

// TODO: move inside WorldView component
var EI = new ESceneInteract()
var EE

const WorldView = (props) => {
    const { gestate, layers, features, epochs } = props;
    const { world, settings, mode } = gestate;

    const [isEditing, setIsEditing] = useState(false); // New state variable

    const mount = useRef(null)
    const sceneRef = useRef(new EnhancedScene())
    const renderRef = useRef(new WebGLRenderer())
    const initialWidth = mount.current ? mount.current.clientWidth : window.innerWidth
    const initialHeight = mount.current ? mount.current.clientHeight : window.innerHeight
    const cameraRef = useRef(new PerspectiveCamera(25, initialWidth / initialHeight, 0.1, 1000))

    const reactions = {
        initialize: () => {
            const scene = sceneRef.current
            const renderer = renderRef.current
            const camera = cameraRef.current
            const size = {
                width: innerWidth,
                height: innerHeight
            }
            EE = new EpochEarth(scene, camera, renderer, gestate.world, size)
        },
        switchMode: () => {
            const scene = sceneRef.current
            const renderer = renderRef.current
            const camera = cameraRef.current
            if (!EE) {
                ii('switchMode: EE not initialized')
                return
            }
            EE.appearance = isEditing ? 'edit' : 'view'
            scene.background = new THREE.Color(isEditing ? 0x103310 : 0xbbbbbb)
        },
        updateScene: () => {
            const scene = sceneRef.current
            const renderer = renderRef.current
            const camera = cameraRef.current


            EE.update({ gestate, layers, features, epochs })

            const updateSize = () => {
                if (mount.current) {
                    const width = mount.current.clientWidth
                    const height = mount.current.clientHeight
                    renderer.setSize(width, height)
                    camera.aspect = width / height
                    camera.updateProjectionMatrix()
                }
            };
            updateSize();

            mount.current.appendChild(renderer.domElement)

            // let EO = new EarthOutline({ scene, ...world })
            EI.setup(EE, { setIsEditing })

            window.addEventListener('resize', updateSize);

            if (camera.position.x === 0) {
                camera.position.z = 34
            }

            const animate = () => {
                requestAnimationFrame(animate)
                renderer.render(scene, camera)
            }

            animate()
            return () => {
                if (mount.current) {
                    mount.current.removeChild(renderer.domElement)
                }
                window.removeEventListener('resize', updateSize)
            }
        }
    }

    // initialize the scene
    useEffect(reactions.initialize, [])
    useEffect(reactions.switchMode, [isEditing])
    useEffect(reactions.updateScene, [gestate, layers, features, epochs])

    return (
        <div className="worldView" style={{
            width: '100%',
            height: '100%',
            backgroundColor: isEditing ? 'yellow' : 'black',
        }}>
            <EpochFinder />
            <div id="map" ref={mount}
                style={{

                    top: 0, // Position it at the top
                    left: 0, // Position it at the left
                    zIndex: 1
                }}
            />
        </div>
    )
}

export default WorldView;
