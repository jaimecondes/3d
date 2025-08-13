import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';

function Lamborghini({ hover, setHover }) {
  const group = useRef();
  const { scene } = useGLTF('/models/lamborghini.glb');

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.2;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={hover ? 1.05 : 1}
      position={[0, -0.6, 0]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    />
  );
}

export default function LamborghiniShowcase() {
  const [hover, setHover] = useState(false);
  const info = useMemo(() => ({
    title: 'Lamborghini Aventador',
    price: '$393,695',
    description: 'High-performance supercar with V12 engine and cutting-edge aerodynamics.'
  }), []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* 3D Canvas section */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-100">
            <Canvas shadows camera={{ position: [0, 1.8, 4], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight castShadow position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, 2, -5]} intensity={0.6} />
              <Environment preset="city" blur={0.8} />

              <Lamborghini hover={hover} setHover={setHover} />
              <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2} />

              {hover && (
                <Html position={[0, 1.2, 0]} center>
                  <div className="bg-white/80 text-sm px-3 py-1 rounded-md shadow-md backdrop-blur">Lamborghini</div>
                </Html>
              )}
            </Canvas>
          </div>
        </div>

        {/* product details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{info.title}</h2>
            <p className="text-xl font-medium text-sky-600 mt-1">{info.price}</p>
            <p className="text-gray-500 mt-3">{info.description}</p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700">Buy Now</button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg">Add to cart</button>
          </div>

          <div className="mt-auto text-sm text-gray-500">
            <p>Worldwide shipping · Limited availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
