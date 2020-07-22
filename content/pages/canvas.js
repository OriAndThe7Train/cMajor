import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Pendulum from "./Pendulum";

extend({ OrbitControls });
// this component enables orbit controls in a r3f canvas
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function App() {
  return (
    <Canvas
      style={{
        height: 500,
        justifyContent: "center",
      }}
    >
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Pendulum position={[0, 0, 0]} />
    </Canvas>
  );
}
export default App;
