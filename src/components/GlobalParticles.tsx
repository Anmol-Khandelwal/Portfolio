'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

// Makes the camera slightly pan with the mouse (Parallax)
function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.pointer.x * 2, state.pointer.y * 2, 8),
      0.05
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// Makes the actual particle galaxy tilt and follow the mouse
function InteractiveSwarm() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    
    const targetX = (state.pointer.x * Math.PI) / 4
    const targetY = (state.pointer.y * Math.PI) / 4

    // Smoothly rotate the particle swarm towards the mouse
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={groupRef}>
      <Sparkles count={1500} scale={[35, 25, 15]} size={2} speed={0.4} opacity={0.5} color="#22D3EE" />
      <Sparkles count={800} scale={[35, 25, 15]} size={3} speed={0.2} opacity={0.3} color="#7C3AED" />
    </group>
  )
}

export default function GlobalParticles() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#7C3AED" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#22D3EE" />
        <Environment preset="city" />
        
        <CameraRig />
        <InteractiveSwarm />
        
        {/* Floating Geometric Shapes - Pushed to the Right */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
           <group position={[5, 0, -2]}>
             <mesh>
               <octahedronGeometry args={[2.5, 0]} />
               <meshStandardMaterial color="#7C3AED" wireframe />
             </mesh>
             <mesh scale={0.8}>
                <icosahedronGeometry args={[2.5, 1]} />
                <meshStandardMaterial color="#22D3EE" wireframe opacity={0.4} transparent />
             </mesh>
           </group>
        </Float>
      </Canvas>

      {/* Retro Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay bg-[repeating-linear-gradient(transparent,transparent_2px,#000_2px,#000_4px)]"></div>
    </div>
  )
}