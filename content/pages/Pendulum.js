import React, { useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { useFrame, useThree } from "react-three-fiber";
import { eulersMethod, rk4 } from "./rk45";
import { useDrag } from "react-use-gesture";
import { a, animated } from "react-spring/three";
var angleSetup = true;
var initialState = [0.8, 0, 0, 0, 1 / 100];
var stateVector = [0, 0, 0, 0, 1 / 100];
function Pendulum(props) {
  //refs for 3D objects used in simulation
  const rod1 = useRef();
  const rod2 = useRef();
  const mass1 = useRef();
  const mass2 = useRef();
  const anchorPoint = useRef();
  const groupMesh = useRef();
  // state variables
  const [hovered, setHover] = useState(false);

  //const [active, setActive] = useState(false);
  const [anchorPointActive, setAnchorPointActive] = useState(false);
  const [massOneActive, setMassOneActive] = useState(false);
  const [massTwoActive, setMassTwoActive] = useState(false);
  const [dragAngle, setDragAngle] = useState(0);
  const [orbitControlsToggle, setOrbitControls] = useState(true);

  // setup quaternion stuff

  var quaternionTheta1 = new Quaternion();
  var quaternionTheta2 = new Quaternion();
  var initialAngle1Quaternion = new Quaternion();
  var initialAngle2Quaternion = new Quaternion();

  const bind1 = useDrag(
    ({ down, movement: [mx, my] }) => {
      setDragAngle(Math.atan2(my, -mx));
      if (down === true) {
        setMassOneActive(true);
        const oldThetaTwoValue = stateVector[2];
        stateVector = [dragAngle, 0, oldThetaTwoValue, 0, 1 / 100];
      } else {
        setMassOneActive(false);
      }
    },
    {
      eventOptions: { pointer: true },
    }
  );

  const bind2 = useDrag(
    ({ down, movement: [mx, my] }) => {
      setDragAngle(Math.atan2(my, -mx));
      if (down === true) {
        setMassTwoActive(true);
        const oldThetaOneValue = stateVector[0];
        stateVector = [oldThetaOneValue, 0, dragAngle, 0, 1 / 100];
      } else {
        setMassTwoActive(false);
      }
    },
    {
      eventOptions: { pointer: true },
    }
  );

  useFrame(() => {
    //runs once at the start to orient the pendulum angles correctly
    if (angleSetup === true) {
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

    //Pauses real time solver if state variable active is true
    if (anchorPointActive === false) {
      stateVector = rk4(initialState);
    }

    //sets a rotation for the distance in angle between current frame and next frame
    quaternionTheta1.setFromAxisAngle(
      new Vector3(0, 0, 1),
      stateVector[0] - initialState[0]
    );
    quaternionTheta2.setFromAxisAngle(
      new Vector3(0, 0, 1),
      -(stateVector[0] - initialState[0]) + stateVector[2] - initialState[2]
    );

    //applies rotation about one end of a rod
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
    <group ref={groupMesh} position={[0, 10, -20]}>
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
        ref={mass1}
        {...bind1()}
        position={[0, 5, 0]}
        scale={massOneActive ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        //onPointerOver={(e) => setHover(true)}
        //onPointerOut={(e) => setHover(false)}
      >
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshStandardMaterial attach="material" color={0x940113} />
      </mesh>

      <mesh
        ref={mass2}
        {...bind2()}
        scale={massTwoActive ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      >
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshStandardMaterial attach="material" color={0x940113} />
      </mesh>

      <mesh
        position={[0, -5, 0]}
        ref={anchorPoint}
        onClick={(e) => setAnchorPointActive(!anchorPointActive)}
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
