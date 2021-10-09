import { animated, SpringRef, SpringValue } from "@react-spring/three";
import React, { FC } from "react";
import { Text } from "@react-three/drei";
import cnFont from "../fonts/cn-font.ttf";
import {
  TILE_HOVER_ANIMATION_UPDATE,
  TILE_RESET_ANIMATION_UPDATE,
} from "../constants/animation";

export interface ITileConfig {
  color: string;
  x: number;
  y: number;
}

interface TileProps {
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
          animationApi.start(TILE_HOVER_ANIMATION_UPDATE(tileIndex));
        }}
        onPointerOut={() => {
          animationApi.start(TILE_RESET_ANIMATION_UPDATE(tileIndex));
        }}
        onClick={() => {
          onClick?.();
          animationApi.start(TILE_RESET_ANIMATION_UPDATE(tileIndex));
        }}
        position-x={x}
        position-y={y}
        position-z={z}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderBufferGeometry args={[20, 20, 3, 6]} />
        <meshPhongMaterial
          attach="material"
          color={tileIndex === 3 ? "#6200EA" : "#000000"}
        />
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
