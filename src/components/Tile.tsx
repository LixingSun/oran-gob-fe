import {
  animated,
  AnimatedComponent,
  SpringRef,
  SpringValue,
} from "@react-spring/three";
import React, { ElementType, FC, useEffect } from "react";
import { Text } from "@react-three/drei";
import cnFont from "../fonts/cn-font.ttf";
import {
  NAVIGATING_ANIMATION_INIT_CONFIG,
  NAVIGATING_ANIMATION_UPDATE,
  TILE_HOVER_ANIMATION_UPDATE,
  TILE_RESET_ANIMATION_UPDATE,
} from "../constants/animation";
import { useSpring } from "@react-spring/core";

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
  active: boolean;
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
  active,
}) => {
  const AnimatedText: AnimatedComponent<ElementType> = animated(Text);

  const [navigatingAnimationSpring, navigatingAnimationApi] = useSpring(
    NAVIGATING_ANIMATION_INIT_CONFIG(tileIndex)
  );

  useEffect(() => {
    navigatingAnimationApi.start(
      NAVIGATING_ANIMATION_UPDATE(active, tileIndex)
    );
  }, [active]);

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
        <animated.meshPhongMaterial
          attach="material"
          color={navigatingAnimationSpring.color}
        />
      </animated.mesh>
      <AnimatedText
        font={cnFont}
        color="#FFFFFF"
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
