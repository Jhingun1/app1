import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera,
  Environment,
  MeshDistortMaterial,
  GradientTexture,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

function CyberSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: hovered ? 1.2 : 1,
        y: hovered ? 1.2 : 1,
        z: hovered ? 1.2 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [hovered]);

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        speed={5}
        distort={0.3}
        radius={1}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#FF006E', '#8338EC', '#3A86FF']}
        />
      </MeshDistortMaterial>
    </mesh>
  );
}

function CyberGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2;
      gridRef.current.position.y = -2;
      gridRef.current.position.z = -2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[50, 50, '#FF006E', '#3A86FF']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function CyberScene() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <color attach="background" args={['#070707']} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF006E" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3A86FF" />
        
        <CyberSphere />
        <CyberGrid />
        
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            offset={[0.002, 0.002]}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
} 