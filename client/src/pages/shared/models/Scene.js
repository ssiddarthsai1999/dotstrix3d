import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Floor from "./Floor";
import { Fog, BackSide } from "three";
import Fireflies from "./Fireflies";
import BackgroundPlane from "./BackgroundPlane";
import SpotlightArea from "./SpotlightArea";
function Scene() {
    // const cameraPosition = [-2, 3, 4.5];
    const boxSize = [10, 10, 10]; // Width, height, depth
    const cameraPosition = [-2, 4, 4.5];
    const fieldOfView = 70;

    return (
        <div className="h-screen w-full  ">
            <Canvas
                shadows
                // In your Canvas setup
                onCreated={({ gl, scene }) => {
                    gl.setClearColor("#E50404"); // Match background color to fog color
                    scene.fog = new Fog("#E50404", 1, 10); // Start fog closer to the camera, adjust as needed
                }}
                camera={{ position: cameraPosition, fov: fieldOfView }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={1.5} />
                    <hemisphereLight
                        skyColor={"#E50404"}
                        groundColor={"##E50404"}
                        intensity={0.5}
                        position={[0, 50, 0]}
                    />
                    {/* <directionalLight
                        position={[12, 34, 2]} // Position the light to ensure shadows fall below the model
                        intensity={10}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        shadow-camera-near={0.5}
                        shadow-camera-far={500}
                        shadow-bias={-0.0001}
                    /> */}

                    <SpotlightArea />
                    <Floor />
                    {/* <BackgroundPlane /> */}
                    <Model />
                    <OrbitControls />
                    {/* <Fireflies count={200} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Scene;
