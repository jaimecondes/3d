import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, MeshTransmissionMaterial } from '@react-three/drei';

// A simple rotating product model
function ProductMesh({ hover, setHover }) {
  const ref = useRef();
  // subtle idle rotation
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
  });

  return (
    <group ref={ref}>
      {/* base plate */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial roughness={0.9} color="#111827" />
      </mesh>

      {/* product body: stylized product (rounded box + logo plane) */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hover ? 1.05 : 1}
      >
        <boxGeometry args={[1.8, 0.6, 1.2]} />
        <meshStandardMaterial metalness={0.6} roughness={0.2} color="#10B981" />
      </mesh>

      {/* subtle accent: top rounded cap */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.18, 32]} />
        <meshStandardMaterial metalness={0.9} roughness={0.15} color="#34D399" />
      </mesh>
      

      {/* logo plate */}
      <mesh position={[0, 0, 0.62]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#ffffff" emissive={'#ffffff'} emissiveIntensity={0.02} />
      </mesh>
    </group>
  );
}

export default function SingleProductThreeJS() {
  const [hover, setHover] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#10B981');
  const info = useMemo(() => ({
    title: 'EcoBottle Pro',
    price: '₱1,599.00',
    description: 'Stylish reusable bottle — insulated, BPA-free, 750ml.',
  }), []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* 3D Canvas section */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-100">
            <Canvas
              shadows
              camera={{ position: [0, 1.8, 4], fov: 45 }}
            >
              {/* ambient + key lights */}
              <ambientLight intensity={0.6} />
              <directionalLight
                castShadow
                position={[5, 5, 5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />

              {/* soft fill light behind the product */}
              <pointLight position={[-5, 2, -5]} intensity={0.6} />

              <Environment preset="city" blur={0.8} />

              {/* Product */}
              <ProductMesh hover={hover} setHover={setHover} />

              {/* Orbit controls for interaction */}
              <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2} />

              {/* subtle HTML overlay inside canvas when hovered */}
              {hover && (
                <Html position={[0, 1.2, 0]} center>
                  <div className="bg-white/80 text-sm px-3 py-1 rounded-md shadow-md backdrop-blur">Hovering</div>
                </Html>
              )}
            </Canvas>
          </div>

          {/* color swatches */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-500">Colors</span>
            {['#10B981', '#3B82F6', '#EF4444', '#F59E0B'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-8 h-8 rounded-full ring-2 ${selectedColor === c ? 'ring-offset-2 ring-opacity-100 ring-sky-400' : 'ring-offset-0 ring-transparent'}`}
                style={{ background: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
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
            <p>Free shipping within the Philippines · 30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}