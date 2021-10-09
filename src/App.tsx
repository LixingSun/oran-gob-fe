import "./App.css";
import React, { FC, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { animated, SpringRef } from "@react-spring/three";
import { useSprings, useSpring } from "@react-spring/core";
import {
  CANVAS_BG_COLOR,
  DEFAULT_SECTIONS,
  TILE_CONFIGS,
} from "./constants/config";
import { Tile } from "./components/Tile";
import { AnimateCamera } from "./components/AnimatedCamera";
import {
  DIVING_ANIMATION_INIT_CONFIG,
  DIVING_ANIMATION_UPDATE,
  DIVING_CAMERA_ANIMATION_INIT_CONFIG,
  DIVING_CAMERA_ANIMATION_UPDATE,
  LANDING_ANIMATION_INIT_CONFIG,
  LANDING_ANIMATION_UPDATE,
  LANDING_DURATION,
  TILE_HOVER_ANIMATION_INIT_CONFIG,
} from "./constants/animation";

const startDiving = (
  animationApi: SpringRef<{ x: number; y: number }>,
  cameraApi: SpringRef<{ cameraZ: number }>,
  startIndex: number
) => {
  cameraApi.start(DIVING_CAMERA_ANIMATION_UPDATE);

  let delay = 300;
  animationApi.start(DIVING_ANIMATION_UPDATE(startIndex));

  for (let index = 0; index < DEFAULT_SECTIONS.length; index++) {
    if (index !== startIndex) {
      setTimeout(() => {
        animationApi.start(DIVING_ANIMATION_UPDATE(index));
      }, (delay += 100));
    }
  }
};

const App: FC = () => {
  const [landingDone, setLandingDone] = useState(false);
  const [hoverAnimationSprings, hoverAnimationApi] = useSprings(
    DEFAULT_SECTIONS.length,
    TILE_HOVER_ANIMATION_INIT_CONFIG
  );

  const [landingAnimationSprings, landingAnimationApi] = useSprings(
    DEFAULT_SECTIONS.length,
    LANDING_ANIMATION_INIT_CONFIG
  );

  const [divingAnimationSprings, divingAnimationApi] = useSprings(
    DEFAULT_SECTIONS.length,
    DIVING_ANIMATION_INIT_CONFIG
  );

  const [divingCameraAnimationSpring, divingCameraAnimationApi] = useSpring(
    DIVING_CAMERA_ANIMATION_INIT_CONFIG
  );

  return (
    <div className="App">
      <Canvas onCreated={(state) => state.gl.setClearColor(CANVAS_BG_COLOR)}>
        <directionalLight
          position={[90, 90, 120]}
          intensity={1}
          color={"#FFFFFF"}
        />

        {TILE_CONFIGS.map((tileConfig, tileIndex) => (
          <animated.group key={tileIndex}>
            <Tile
              tileIndex={tileIndex}
              animationApi={hoverAnimationApi}
              x={
                landingDone
                  ? divingAnimationSprings[tileIndex]?.x
                  : landingAnimationSprings[tileIndex]?.x
              }
              y={
                landingDone
                  ? divingAnimationSprings[tileIndex]?.y
                  : landingAnimationSprings[tileIndex]?.y
              }
              z={hoverAnimationSprings[tileIndex]?.z}
              textZ={hoverAnimationSprings[tileIndex]?.textZ}
              onClick={() => {
                if (tileIndex === 3 && !landingDone) {
                  landingAnimationApi.start(LANDING_ANIMATION_UPDATE);
                  setTimeout(() => {
                    setLandingDone(true);
                  }, LANDING_DURATION);
                } else {
                  startDiving(
                    divingAnimationApi,
                    divingCameraAnimationApi,
                    tileIndex
                  );
                }
              }}
              text={DEFAULT_SECTIONS[tileIndex]}
            />
          </animated.group>
        ))}

        <AnimateCamera
          cameraZ={
            landingDone
              ? divingCameraAnimationSpring.cameraZ
              : landingAnimationSprings[0].cameraZ
          }
        />
      </Canvas>
    </div>
  );
};

export default App;
