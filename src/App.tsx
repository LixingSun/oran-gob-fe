import "./App.css";
import React, { FC } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Text, Stats } from "@react-three/drei";
import { animated, SpringRef, SpringValue } from "@react-spring/three";
import { useSprings } from "@react-spring/core";
import cnFont from "./fonts/cn-font.ttf";
import { easeCubicOut, easeCubicInOut } from "d3-ease";
import { PerspectiveCamera } from "three";

const data: string[] = ["前端", "后端", "DevOps", "Me", "架构", "测试", "游戏"];

interface ITileConfig {
  color: string;
  x: number;
  y: number;
}

const tileConfigs: ITileConfig[] = [
  {
    color: "#64B5F6",
    x: -18,
    y: 31,
  },
  {
    color: "#FFCA28",
    x: 18,
    y: 31,
  },
  {
    color: "#43A047",
    x: -36,
    y: 0,
  },
  {
    color: "#6200EA",
    x: 0,
    y: 0,
  },
  {
    color: "#795548",
    x: 36,
    y: 0,
  },
  {
    color: "#546E7A",
    x: -18,
    y: -31,
  },
  {
    color: "#F44336",
    x: 18,
    y: -31,
  },
];

interface AnimateCameraProps {
  cameraZ: SpringValue<number>;
}

const AnimateCamera: FC<AnimateCameraProps> = ({ cameraZ }) => {
  const { camera, set, size } = useThree();
  const cameraRef = React.useRef<PerspectiveCamera>();

  React.useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size]);

  React.useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current! }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  return (
    <animated.perspectiveCamera
      ref={cameraRef}
      position-x={0}
      position-y={0}
      position-z={cameraZ}
      fov={50}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
};

interface TileProps {
  tileConfig: ITileConfig;
  tileIndex: number;
  animationApi: SpringRef<{ z: number; textZ: number }>;
  x: SpringValue<number>;
  y: SpringValue<number>;
  z: SpringValue<number>;
  textZ: SpringValue<number>;
  onClick: () => void;
}

const Tile: FC<TileProps> = ({
  tileConfig,
  tileIndex,
  animationApi,
  x,
  y,
  z,
  textZ,
  onClick,
}) => {
  const AnimatedText = animated(Text);
  return (
    <>
      <animated.mesh
        onPointerOver={() => {
          animationApi.start((animatedIndex) => {
            if (animatedIndex === tileIndex) return { z: 10, textZ: 17 };
            return {};
          });
        }}
        onPointerOut={() => {
          animationApi.start((animatedIndex) => {
            if (animatedIndex === tileIndex) return { z: 0, textZ: 7 };
            return {};
          });
        }}
        onClick={() => {
          onClick?.();
        }}
        position-x={x}
        position-y={y}
        position-z={z}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderBufferGeometry args={[20, 20, 5, 6]} />
        <meshPhongMaterial attach="material" color={tileConfig.color} />
      </animated.mesh>
      <AnimatedText
        font={cnFont}
        color="#F0F0F0"
        fontSize={7}
        position-x={x}
        position-y={y}
        position-z={textZ}
      >
        {data[tileIndex]}
      </AnimatedText>
    </>
  );
};

const landingDuration = 2400;

const App: FC = () => {
  const [hoverAnimationSprings, hoverAnimationApi] = useSprings(
    data.length,
    () => ({
      z: 0,
      textZ: 7,
      config: {
        duration: 700,
        easing: easeCubicInOut,
      },
    })
  );

  const [landingAnimationSprings, landingAnimationApi] = useSprings(
    data.length,
    (index) => ({
      x: tileConfigs[index].x * 10,
      y: tileConfigs[index].y * 10,
      cameraZ: 80,
      config: {
        duration: landingDuration,
        easing: easeCubicOut,
      },
    })
  );

  return (
    <div className="App">
      <Canvas onCreated={(state) => state.gl.setClearColor("#212121")}>
        <Stats showPanel={0} className="stats" />
        <directionalLight
          position={[90, 90, 120]}
          intensity={1}
          color={"#FFFFFF"}
        />

        {tileConfigs.map((tileConfig, tileIndex) => (
          <animated.group key={tileIndex}>
            <Tile
              tileConfig={tileConfig}
              tileIndex={tileIndex}
              animationApi={hoverAnimationApi}
              x={landingAnimationSprings[tileIndex]?.x}
              y={landingAnimationSprings[tileIndex]?.y}
              z={hoverAnimationSprings[tileIndex]?.z}
              textZ={hoverAnimationSprings[tileIndex]?.textZ}
              onClick={() => {
                if (tileIndex === 3) {
                  landingAnimationApi.start((animatedIndex) => ({
                    x: tileConfigs[animatedIndex].x,
                    y: tileConfigs[animatedIndex].y,
                    cameraZ: 120,
                  }));
                }
              }}
            />
          </animated.group>
        ))}

        <AnimateCamera cameraZ={landingAnimationSprings[0].cameraZ} />
      </Canvas>
    </div>
  );
};

export default App;
