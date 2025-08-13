// HexagonScene.jsx
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges, Html } from "@react-three/drei";

function Hexagon({ color = "#10B981", radius = 1, height = 0.4, hoverScale = 1.12 }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // rotate slowly
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  // cylinder with radialSegments = 6 => hexagonal cross-section (hexagonal prism)
  return (
    <group ref={ref} scale={hovered ? hoverScale : 1}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[radius, radius, height, 6]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.25} />
        <Edges threshold={15} visible={true} />
      </mesh>

      {/* optional top face marker to make orientation clear */}
      <mesh position={[0, height / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.45, 6]} />
        <meshStandardMaterial color={"#ffffff"} opacity={0.06} transparent />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
    </group>
  );
}

export default function HexagonScene() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#0f172a" }}>
      <Canvas shadows camera={{ position: [3, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} castShadow />
        <pointLight position={[-5, -2, -5]} intensity={0.3} />

        <Hexagon color="#ef4444" radius={1.1} height={0.45} />

        <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2} />

        {/* simple ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#071024" />
        </mesh>

        {/* small HTML label centered above when hovered (optional) */}
        <Html position={[0, 1.2, 0]} center>
          <div style={{
            pointerEvents: "none",
            color: "white",
            fontSize: 14,
            background: "rgba(0,0,0,0.45)",
            padding: "6px 10px",
            borderRadius: 8
          }}>
            Hexagon
          </div>
        </Html>
      </Canvas>
    </div>
  );
}
