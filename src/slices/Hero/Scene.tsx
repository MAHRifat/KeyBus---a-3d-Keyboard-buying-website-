"use client";
import { Keyboard } from "@/app/components/Keyboard";
import { Keycap } from "@/app/components/Keycap";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

export const Scene = () => {
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls({
      positionX: { value: 0, min: -10, max: 10, step: 0.1 },
      positionY: { value: -0.5, min: -10, max: 10, step: 0.1 },
      positionZ: { value: 3, min: -10, max: 10, step: 0.1 },
      rotationX: { value: Math.PI / 2, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    });

  return (
    <group>
      <PerspectiveCamera position={[0, 0, 4]} fov={50} makeDefault />

      <Keyboard
        scale={9}
        position={[0.2, -0.5, 1.9]}
        rotation={[1.5, 0.4, 0]}
      />
      {/* <ambientLight intensity={.2} /> */}
      
      <group>
        <Keycap 
            position={[0, -0.4, 2.6]}             
        />
        <Keycap 
            position={[-1.4, 0, 2.3]}   
        />
        <Keycap 
            position={[-1.8, 1, 1.5]}   
        />
        <Keycap 
            position={[0, 1, 1]}   
        />
        <Keycap 
            position={[0.7, .9, 1.4]}   
        />
        <Keycap 
            position={[1.3, -.3, 2.3]}   
        />
        <Keycap 
            position={[0, 1, 2]}   
        />
        <Keycap 
            position={[-.7, .6, 2]}   
        />
        <Keycap 
            position={[-.77, .1, 2.8]}   
        />
        <Keycap 
            position={[2, 0, 1]}   
        />

      </group>

      <Environment
        files={["/hdr/blue-studio.hdr"]}
        environmentIntensity={0.1}
      />


      <spotLight
        position={[-0.2, 1.5, 3]}
        intensity={30}
        castShadow
        shadow-bias={-0.0002}
        shadow-normalBias={0.05}
        shadow-mapSize={1024}
      />
    </group>
  );
};
