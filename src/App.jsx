// https://cydstumpel.nl/

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Float,
  Image,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { easing } from "maath";
import "./util";
import { Leva, useControls, button } from "leva";
import { Perf } from "r3f-perf";

export function App() {
  const { LightPositionX, LightPositionY, LightPositionZ, LightIntensity } =
    useControls({
      LightPositionX: {
        value: 0.01,
        min: -0.5,
        max: 0.5,
      },
      LightPositionY: {
        value: 0.04,
        min: -0.5,
        max: 0.5,
      },
      LightPositionZ: {
        value: 0.1,
        min: 0,
        max: 1,
      },
      LightIntensity: {
        value: 5,
        min: 0,
        max: 20,
      },
      
    });
  return (
    <>
      <Leva />
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <Perf position="top-left" />

        <ambientLight intensity={6} />
        <directionalLight
          position={[LightPositionX, LightPositionY, LightPositionZ]}
          intensity={LightIntensity}
        />

        <OrbitControls />
        <Rig>
          <Card />
        </Rig>
      </Canvas>
    </>
  );
}

function Rig(props) {
  const ref = useRef();

  useFrame((state, delta) => {
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 10, -state.pointer.y * 10, 20],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Card({ url, ...props }) {
  const [Theme, setTheme] = useState(1);
  const { Metalness, Roughness } = useControls({
    Metalness: {
      value: 0.7,
      min: 0,
      max: 1,
    },
    Roughness: {
      value: 0.25,
      min: 0,
      max: 1,
    },
    
    Theme1: button(() => {
      setTheme(1);
    }),
    
    Theme2: button(() => {
      setTheme(2);
    }),
    
    Theme3: button(() => {
      setTheme(3);
    }),
    
    Theme4: button(() => {
      setTheme(4);
    }),
    
    Theme5: button(() => {
      setTheme(5);
    }),
  });
  const texture = useLoader(THREE.TextureLoader, `./Group_${Theme}.png`);
  return (
    <Float>
      <mesh>
        <meshStandardMaterial
          map={texture}
          metalness={Metalness}
          roughness={Roughness}
          transparent
        />
        <Text
          position={[-1.9, -0.9, 0.01]}
          anchorX="left"
          color={Theme === 1 ? "black" : "white"}
          fontSize={0.2}
        >
          Himanshu Kaushik
        </Text>
        <Text anchorX="left" position={[-1.8, -1.17, 0.01]}>
          <Image scale={[0.13, 0.13, 0]} url="./Team.png" transparent />
        </Text>
        <Text
          anchorX="left"
          position={[-1.65, -1.2, 0.01]}
          color={Theme === 1 ? "black" : "white"}
          fontSize={0.13}
        >
          Team Name
        </Text>
        <planeGeometry args={[5, 3]} />
      </mesh>
    </Float>
  );
}
