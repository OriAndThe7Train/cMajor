import React, { useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { useFrame } from "react-three-fiber";
import { eulersMethod, rk4 } from "./rk45";

var angleSetup = true;
var initialState = [0.2, 0.2, 0.2, -0.6, 1 / 100];
var stateVector = [0, 0, 0, 0, 0];

function Pendulum(props) {
  const rod1 = useRef();
  const rod2 = useRef();
  const mass1 = useRef();
  const mass2 = useRef();
  const anchorPoint = useRef();

  const groupMesh = useRef();
  const [hovered, setHover] = useState(false);
  var [active, setActive] = useState(false);
  //var [active2, setActive] = useState(false);

  //quaternion stuff

  var quaternionTheta1 = new Quaternion();
  var quaternionTheta2 = new Quaternion();
  var initialAngle1Quaternion = new Quaternion();
  var initialAngle2Quaternion = new Quaternion();

  useFrame(() => {
    if (angleSetup == true) {
      initialAngle1Quaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        Math.PI + initialState[0]
      );

      initialAngle2Quaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        initialState[2] - initialState[0]
      );

      groupMesh.current.applyQuaternion(initialAngle1Quaternion);
      groupMesh.current.translateY(5);

      rod2.current.translateY(-5);
      rod2.current.applyQuaternion(initialAngle2Quaternion);
      rod2.current.translateY(5);
      angleSetup = false;
    }

    if (isMass1Active == false) {
      stateVector = rk4(initialState);
    }

    quaternionTheta1.setFromAxisAngle(
      new Vector3(0, 0, 1),
      stateVector[0] - initialState[0]
    );
    quaternionTheta2.setFromAxisAngle(
      new Vector3(0, 0, 1),
      -(stateVector[0] - initialState[0]) + stateVector[2] - initialState[2]
    );

    groupMesh.current.translateY(-5);
    groupMesh.current.applyQuaternion(quaternionTheta1);
    groupMesh.current.translateY(5);

    rod2.current.translateY(-5);
    rod2.current.applyQuaternion(quaternionTheta2);
    rod2.current.translateY(5);

    rod2.current.translateY(5);
    mass2.current.translateX(
      rod2.current.position.x - mass2.current.position.x
    );
    mass2.current.translateY(
      rod2.current.position.y - mass2.current.position.y
    );
    rod2.current.translateY(-5);

    initialState = stateVector;
  });

  return (
    <group ref={groupMesh}>
      <mesh
        position={[0, 0, 0]}
        ref={rod1}
        //onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <cylinderBufferGeometry attach="geometry" args={[0.05, 0.05, 10, 24]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? "hotpink" : 0x325aa8}
        />
      </mesh>
      <mesh
        position={[0, 10, 0]}
        ref={rod2}
        //onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <cylinderBufferGeometry attach="geometry" args={[0.05, 0.05, 10, 24]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? "hotpink" : 0x325aa8}
        />
      </mesh>
      <mesh
        position={[0, 5, 0]}
        ref={mass1}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshStandardMaterial attach="material" color={0x940113} />
      </mesh>

      <mesh
        position={[0, 0, 0]}
        ref={mass2}
        onClick={(e) => setActive(!active)}
      >
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshStandardMaterial attach="material" color={0x940113} />
      </mesh>

      <mesh
        position={[0, -5, 0]}
        ref={anchorPoint}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshStandardMaterial attach="material" color={0x4d3110} />
      </mesh>
    </group>
  );
}

export default Pendulum;
