import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Fog, BackSide, RepeatWrapping } from "three";
const SpotlightArea = ({
    position = [0, 0, 0],
    radius = 5,
    widthSegments = 32,
    heightSegments = 32,
}) => {
    const [colorMap, roughnessMap, displacementMap, normalMap, noiseMap] =
        useLoader(TextureLoader, [
            "textures/textures/paper/vcrkdg2n_2K_Albedo.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Roughness.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Displacement.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Normal.jpg",
            "textures/textures/noise.png",
        ]);

    // Ensure textures repeat properly
    const textures = [colorMap, roughnessMap, normalMap, noiseMap];
    textures.forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;

        texture.repeat.set(200, 200);
    });

    return (
        <mesh position={position}>
            <sphereGeometry
                attach="geometry"
                args={[radius, widthSegments, heightSegments]}
            />
            <meshStandardMaterial
                attach="material"
                map={colorMap}
                roughnessMap={roughnessMap}
                metalness={0}
                normalMap={normalMap}
                displacementMap={displacementMap}
                displacementScale={0.1}
                side={BackSide}
                color="red"
                // Add the noise texture as an additional map
                onBeforeCompile={(shader) => {
                    shader.uniforms.noiseMap = { value: noiseMap };
                    shader.vertexShader = `
                        varying vec2 vUv;
                        ${shader.vertexShader}
                    `;
                    shader.vertexShader = shader.vertexShader.replace(
                        `#include <uv_vertex>`,
                        `#include <uv_vertex>
                         vUv = uv;`
                    );
                    shader.fragmentShader = `
                        uniform sampler2D noiseMap;
                        varying vec2 vUv;
                        ${shader.fragmentShader}
                    `;
                    shader.fragmentShader = shader.fragmentShader.replace(
                        `vec4 diffuseColor = vec4( diffuse, opacity );`,
                        `vec4 noiseTexture = texture2D(noiseMap, vUv);
                         vec4 diffuseColor = vec4( diffuse, opacity ) * noiseTexture;`
                    );
                }}
            />
        </mesh>
    );
};

export default SpotlightArea;
