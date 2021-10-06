import { animated, SpringRef, SpringValue } from "@react-spring/three";
import React, { FC } from "react";
import { Text } from "@react-three/drei";
import cnFont from "../fonts/cn-font.ttf";

export interface ITileConfig {
  color: string;
  x: number;
  y: number;
}

interface TileProps {
  tileConfig: ITileConfig;
  tileIndex: number;
  animationApi: SpringRef<{ z: number; textZ: number }>;
  x: SpringValue<number>;
  y: SpringValue<number>;
  z: SpringValue<number>;
  textZ: SpringValue<number>;
  onClick: () => void;
  text: string;
}

export const Tile: FC<TileProps> = ({
  tileConfig,
  tileIndex,
  animationApi,
  x,
  y,
  z,
  textZ,
  onClick,
  text,
}) => {
  const AnimatedText: FC<any> = animated(Text);
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
        {text}
      </AnimatedText>
    </>
  );
};
