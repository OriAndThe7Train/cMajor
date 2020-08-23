import React, { useRef, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";

function myFloor() {
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100, 100]} />
      <meshStandardMaterial attach="material" color={"brown"} />
    </mesh>
  );
}

export default myFloor;
