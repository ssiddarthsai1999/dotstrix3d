import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Fireflies = ({ count = 100 }) => {
    const mesh = useRef();
    const light = useRef();
    // Generate random positions
    const positions = useMemo(() => {
        let positions = [];
        for (let i = 0; i < count; i++) {
            positions.push(
                Math.random() * 4 - 2,
                Math.random() * 4 - 2,
                Math.random() * 4 - 2
            );
        }
        return new Float32Array(positions);
    }, [count]);

    // Animate the fireflies
    useFrame(() => {
        if (
            mesh.current &&
            mesh.current.geometry &&
            mesh.current.geometry.attributes.position
        ) {
            const { array } = mesh.current.geometry.attributes.position;
            for (let i = 0; i < array.length; i += 3) {
                array[i] += (Math.random() - 0.5) * 0.01;
                array[i + 1] += (Math.random() - 0.5) * 0.01;
                array[i + 2] += (Math.random() - 0.5) * 0.01;
            }
            mesh.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                size={0.05}
                color="#ffdd55"
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default Fireflies;
