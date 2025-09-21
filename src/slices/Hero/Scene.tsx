'use client';
import { Keyboard } from "@/app/components/Keyboard"

export const Scene = () => {
    return(
        <group>
            <Keyboard scale={9} position={[0, -.5, 3]} rotation={[Math.PI / 2, 0, 0]} />
            <ambientLight intensity={1} />
            <pointLight position={[0, 1, 5]} intensity={2} />
            
        </group>
    )
}