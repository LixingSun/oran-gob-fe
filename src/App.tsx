import "./App.css";
import React, { useState, FC } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text } from "@react-three/drei";
import { animated, SpringRef, SpringValue } from "@react-spring/three";
import { useSprings } from "@react-spring/core";

const data: string[] = [
  "F/E",
  "B/E",
  "DevOps",
  "Me",
  "Architecture",
  "Testing",
  "Gaming",
];

interface ITileConfig {
  color: string;
  x: number;
  y: number;
}

const tileConfigs: ITileConfig[] = [
  {
    color: "#90CAF9",
    x: -18,
    y: 31,
  },
  {
    color: "#FFCC80",
    x: 18,
    y: 31,
  },
  {
    color: "#80CBC4",
    x: -36,
    y: 0,
  },
  {
    color: "#000000",
    x: 0,
    y: 0,
  },
  {
    color: "#CC6699",
    x: 36,
    y: 0,
  },
  {
    color: "#FFEE00",
    x: -18,
    y: -31,
  },
  {
    color: "#EE2266",
    x: 18,
    y: -31,
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

interface TileProps {
  tileConfig: ITileConfig;
  tileIndex: number;
  animationSprings: { z: SpringValue<number> }[];
  animationApi: SpringRef<{ z: number }>;
}

const Tile: FC<TileProps> = ({
  tileConfig,
  tileIndex,
  animationSprings,
  animationApi,
}) => {
  return (
    <>
      <animated.mesh
        onPointerOver={() => {
          animationApi.start((animatedIndex) => {
            if (animatedIndex === tileIndex) return { z: 10 };
            return {};
          });
        }}
        onPointerOut={() => {
          animationApi.start((animatedIndex) => {
            if (animatedIndex === tileIndex) return { z: 0 };
            return {};
          });
        }}
        position-x={tileConfig.x}
        position-y={tileConfig.y}
        position-z={animationSprings[tileIndex].z}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderBufferGeometry args={[20, 20, 2, 6]} />
        <meshPhongMaterial attach="material" color={tileConfig.color} />
      </animated.mesh>
      <Text
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        color="#F0F0F0"
        fontSize={5}
        position-x={tileConfig.x}
        position-y={tileConfig.y}
        position-z={2}
      >
        {data[tileIndex]}
      </Text>
    </>
  );
};

const App: FC = () => {
  const [cursorPosition, setCursorPosition] = useState<TypeCursorPosition>([
    null,
    null,
  ]);

  const screenSize: TypeScreenSize = [window.innerWidth, window.innerHeight];

  const [springs, api] = useSprings(data.length, () => ({
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
          position={[0, 0, 100]}
          fov={50}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        />
        <directionalLight
          position={[30, 40, 70]}
          intensity={1}
          color={"#FFFFFF"}
        />

        {tileConfigs.map((tileConfig, tileIndex) => (
          <animated.group key={tileIndex}>
            <Tile
              tileConfig={tileConfig}
              tileIndex={tileIndex}
              animationSprings={springs}
              animationApi={api}
            />
          </animated.group>
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
