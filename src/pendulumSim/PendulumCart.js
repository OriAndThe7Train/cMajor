import React, { useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Quaternion, Vector3 } from "three";

function PendulumCart(props) {
  const pendulumCart = useRef();

  useFrame(() => {
    pendulumCart.current.applyQuaternion(props.cartRotation);
  });

  return (
    <mesh
      {...props}
      rotation={[Math.PI / 2, 0, 0]}
      ref={pendulumCart}
      receiveShadow
      castShadow
    >
      <cylinderBufferGeometry attach="geometry" args={[1.5, 1.5, 1, 36]} />
      <meshStandardMaterial attach="material" color={0x412234} />
    </mesh>
  );
}

export default PendulumCart;
