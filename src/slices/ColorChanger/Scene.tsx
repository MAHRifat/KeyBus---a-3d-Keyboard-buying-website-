import { Keyboard } from "@/app/components/Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type SceneProps = {
  selectedTextureId: string;
  onAnimatinonComplete: () => void;
};

export function Scene({ selectedTextureId, onAnimatinonComplete }: SceneProps) {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  //   animate the keyboard when the texture changes
  useGSAP(() => {
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;
    
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        const keyboard = keyboardRef.current;
      // If the user prefers reduced motion, skip the animation
       if(!keyboard) return;
      const tl = gsap.timeline({
          onComplete: () => {
              onAnimatinonComplete();
            }
        });
        
        tl.to(keyboard.position, { y: 0.3, duration: 1.5, ease: "power2.out", onComplete: () => {
            setCurrentTextureId(selectedTextureId);
            
        }});
        tl.to(keyboard.position, {
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
        });
    });

    mm.add("prefers-reduced-motion: reduce", () => {
        setCurrentTextureId(selectedTextureId);
        onAnimatinonComplete();
    });

    
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;

      if (textures) {
        texture.flipY = false; // Correct the texture orientation
        texture.colorSpace = THREE.SRGBColorSpace; // Set the color space to sRGB

        materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });

    return materialMap;
  }, [textures]);

  const currentKnobColor =
    KEYCAP_TEXTURES.find((t) => t.id === selectedTextureId)?.knobColor ||
    "#e24818";

  return (
    // stage use for lighting and environment and center the canvas
    <Stage
      environment="city"
      intensity={0.005}
      shadows="contact"
      adjustCamera={1.5}
    >
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
}
