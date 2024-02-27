import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader, CubeTextureLoader, RepeatWrapping } from "three";

export default function Floor() {
    const [colorMap, roughnessMap, displacementMap, normalMap] = useLoader(
        TextureLoader,
        [
            "textures/textures/paper/vcrkdg2n_2K_Albedo.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Roughness.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Displacement.jpg",
            "textures/textures/paper/vcrkdg2n_2K_Normal.jpg",
        ]
    );

    const { scene } = useThree();

    // Load an environment map
    const envMap = new CubeTextureLoader().load([
        "path/to/px.jpg",
        "path/to/nx.jpg",
        "path/to/py.jpg",
        "path/to/ny.jpg",
        "path/to/pz.jpg",
        "path/to/nz.jpg",
    ]);
    scene.environment = envMap;

    const textures = [colorMap, roughnessMap, displacementMap, normalMap];
    textures.forEach((texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(30, 30);
    });

    // Adjust the roughness map influence
    // roughnessMap.wrapS = RepeatWrapping;
    // roughnessMap.wrapT = RepeatWrapping;
    // roughnessMap.repeat.set(50, 50);

    // Animate the texture
    useFrame((state, delta) => {
        colorMap.offset.y -= delta * 0.03;
    });

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          
        >
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial
                map={colorMap} // The texture map
                roughnessMap={roughnessMap} // The roughness map
                roughness={0.1} // Lower roughness for a wet look
                metalness={0.2} // Slight metalness for reflective sheen
                normalMap={normalMap} // The normal map
                envMap={envMap} // Environment map for reflections
                displacementMap={displacementMap} // The displacement map
                displacementScale={0.2} // Displacement scale for a 3D effect
                color="#821212" // This will give the material a red tint
            />
        </mesh>
    );
}
