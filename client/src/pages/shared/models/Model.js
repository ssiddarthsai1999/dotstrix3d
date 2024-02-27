import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three"; // Import the THREE namespace

const Model = () => {
    const model = useLoader(FBXLoader, "/walking.fbx");
    const mixer = useRef();

    useEffect(() => {
        if (model.animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(model);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });

            model.animations.forEach((clip) => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });
        }

        return () => mixer.current?.stopAllAction(); // Cleanup function to stop animations when component unmounts
    }, [model]);

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    return (
        <primitive
            object={model}
            position={[0, 0, 0]}
            scale={0.018}
 
        />
    );
};

export default Model;
