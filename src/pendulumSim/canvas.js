import React, { useRef } from "react"
import { Canvas, useFrame, useThree, extend } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Pendulum from "./Pendulum"
import PendulumCart from "./PendulumCart"

import * as THREE from "three"
extend({ OrbitControls })
// this component enables orbit controls in a r3f canvas

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()

  const controls = useRef()
  useFrame((state) => controls.current.update())
  return (
    <orbitControls ref={controls} args={[camera, domElement]} enabled={false} />
  )
}

function App() {
  return (
    <Canvas
      style={{
        height: 500,
        justifyContent: "center",
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
    >
      <color attach="background" args={["lightblue"]} />
      <CameraControls />
      <ambientLight />
      <spotLight position={[40, 5, 40]} castShadow />
      <Pendulum position={[0, 10, -25]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -20, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <shadowMaterial attach="material" transparent opacity={0.0} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 3, 0, 0]}
        position={[0, 0, -50]}
        receiveShadow
        castShadow
      >
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
    </Canvas>
  )
}
export default App
