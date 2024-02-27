import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MeshBasicMaterial, PlaneBufferGeometry } from "three";

// Custom mesh material that ignores depth
function MeshBasicMaterialDepthDisabled(props) {
    const materialRef = useRef();
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.depthTest = false;
            materialRef.current.depthWrite = false;
        }
    });

    return <meshBasicMaterial ref={materialRef} {...props} />;
}

export default function BackgroundPlane({ noiseTexture }) {
    const { camera, viewport, scene } = useThree();

    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Place the plane slightly in front of the camera
    const planePositionZ = useMemo(() => camera.near + 0.1, [camera.near]);

    // Make sure the plane always faces the camera and fills the viewport
    useFrame(() => {
        if (mesh.current) {
            mesh.current.position.copy(camera.position);
            mesh.current.position.z += planePositionZ;
            mesh.current.scale.set(viewport.width * 2, viewport.height * 2, 1);
            mesh.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <MeshBasicMaterialDepthDisabled
                attach="material"
                map={noiseTexture}
                transparent
                opacity={0.5} // Adjust opacity to see the texture
                color="red" // Set a default color
            />
        </mesh>
    );
}
