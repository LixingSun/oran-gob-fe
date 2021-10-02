import "./App.css";
import React, { useState, FC, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { animated } from "@react-spring/three";
import { useSprings } from "@react-spring/core";

const cylinderConfigs = [
  {
    color: "#714CFE",
    x: -1.8,
    y: 0.9,
  },
  {
    color: "#00FFEE",
    x: 0,
    y: 0.9,
  },
  {
    color: "#CC6699",
    x: 1.8,
    y: 0.9,
  },
  {
    color: "#FFEE00",
    x: -0.9,
    y: -0.65,
  },
  {
    color: "#EE2266",
    x: 0.9,
    y: -0.65,
  },
];

type TypeCursorPosition = [number, number];
type TypeScreenSize = [number, number];

interface AnimateCameraProps {
  cursorPosition: TypeCursorPosition;
  screenSize: TypeScreenSize;
}

const AnimateCamera: FC<AnimateCameraProps> = ({
  cursorPosition,
  screenSize,
}) => {
  const { gl, camera } = useThree();

  const animationRatio = (Math.PI / 2 / 90) * 10;

  const calculateDegree = (screenSize: number, current: number): number => {
    const percentage = ((screenSize / 2 - current) / screenSize) * 2;
    return percentage * animationRatio;
  };

  useFrame(() => {
    camera.rotateX(calculateDegree(screenSize[1], cursorPosition[1]));
    camera.rotateY(calculateDegree(screenSize[0], cursorPosition[0]));
  });

  return (
    <OrbitControls
      enablePan={false}
      enableRotate={false}
      enableZoom={false}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};

const App: FC = () => {
  const tileRefs = [
    useRef<THREE.Mesh>(),
    useRef<THREE.Mesh>(),
    useRef<THREE.Mesh>(),
    useRef<THREE.Mesh>(),
    useRef<THREE.Mesh>(),
  ];
  const [cursorPosition, setCursorPosition] = useState<TypeCursorPosition>([
    null,
    null,
  ]);

  const screenSize: TypeScreenSize = [window.innerWidth, window.innerHeight];

  const [springs, api] = useSprings(5, () => ({
    z: 0,
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }));

  return (
    <div
      className="App"
      onMouseMove={(event) => setCursorPosition([event.clientX, event.clientY])}
    >
      <Canvas onCreated={(state) => state.gl.setClearColor("#212121")}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={50}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        />
        <directionalLight
          position={[5, 10, 25]}
          intensity={1}
          color={"#FFFFFF"}
        />

        {cylinderConfigs.map((cylinderConfig, index) => (
          <animated.mesh
            key={index}
            ref={tileRefs[index]}
            onPointerOver={() => {
              api.start((i) => ({
                z: i === index ? 0.5 : 0,
              }));
            }}
            position-x={cylinderConfig.x}
            position-y={cylinderConfig.y}
            position-z={springs[index].z}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderBufferGeometry args={[1, 1, 0.1, 6]} />
            <animated.meshPhongMaterial
              attach="material"
              color={cylinderConfig.color}
            />
          </animated.mesh>
        ))}

        <AnimateCamera
          cursorPosition={cursorPosition}
          screenSize={screenSize}
        />
      </Canvas>
    </div>
  );
};

export default App;
