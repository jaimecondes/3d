import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SingleProductThreeJS from "./components/singleProduct";
import LamborghiniShowcase from "./components/lambo";
import HexagonScene from "./components/hexagon";
import './App.css';
// function Cube() {
//   return (
//     <mesh rotation={[0.4, 0.2, 0]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="skyblue" />
//     </mesh>
//   );
// }

export default function App() {
  return (
    
    <div className="w-screen h-screen bg-gray-900">
      <HexagonScene />
      {/* <LamborghiniShowcase /> */}
      {/* <SingleProductThreeJS /> */}
      {/* <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Cube />
        <OrbitControls />
      </Canvas> */}
    </div>
  );
}
