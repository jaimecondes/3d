import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function HexagonWithSphere() {
  // Hexagon geometry
  const hexShape = new THREE.Shape();
  const sides = 6;
  const radius = 2;

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      hexShape.moveTo(x, y);
    } else {
      hexShape.lineTo(x, y);
    }
  }
  hexShape.closePath();

  const hexGeometry = new THREE.ExtrudeGeometry(hexShape, {
    depth: 1,
    bevelEnabled: false,
  });

  return (
    <>
      {/* Hexagon */}
      <mesh geometry={hexGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ff6600" />
      </mesh>

      {/* Sphere on top */}
      <mesh position={[0, 0, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, -6, 5], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Object */}
      <HexagonWithSphere />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
}
