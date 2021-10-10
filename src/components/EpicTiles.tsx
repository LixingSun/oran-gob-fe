import { EPICS, EPICS_AMOUNT, TILE_CONFIGS } from "../constants/config";
import { animated, SpringRef } from "@react-spring/three";
import { Tile } from "./Tile";
import {
  DIVING_ANIMATION_INIT_CONFIG,
  DIVING_ANIMATION_UPDATE,
  DIVING_CAMERA_ANIMATION_INIT_CONFIG,
  DIVING_CAMERA_ANIMATION_UPDATE,
  LANDING_ANIMATION_INIT_CONFIG,
  LANDING_ANIMATION_UPDATE,
  LANDING_DURATION,
  TILE_HOVER_ANIMATION_INIT_CONFIG,
} from "../constants/animation";
import React, { FC, useState } from "react";
import { AnimateCamera } from "./AnimatedCamera";
import { useSpring, useSprings } from "@react-spring/core";
import { useActiveEpicIndexStore } from "../stores/useActiveEpicIndexStore";

const startDiving = (
  animationApi: SpringRef<{ x: number; y: number }>,
  cameraApi: SpringRef<{ cameraZ: number }>,
  startIndex: number
) => {
  cameraApi.start(DIVING_CAMERA_ANIMATION_UPDATE);

  let delay = 300;
  animationApi.start(DIVING_ANIMATION_UPDATE(startIndex));

  for (let index = 0; index < EPICS_AMOUNT; index++) {
    if (index !== startIndex) {
      setTimeout(() => {
        animationApi.start(DIVING_ANIMATION_UPDATE(index));
      }, (delay += 100));
    }
  }
};

export const EpicTiles: FC = () => {
  const { activeEpicIndex, setActiveEpicIndex } = useActiveEpicIndexStore(
    (state) => state
  );

  const [landingDone, setLandingDone] = useState(false);

  const [hoverAnimationSprings, hoverAnimationApi] = useSprings(
    EPICS_AMOUNT,
    TILE_HOVER_ANIMATION_INIT_CONFIG
  );
  const [landingAnimationSprings, landingAnimationApi] = useSprings(
    EPICS_AMOUNT,
    LANDING_ANIMATION_INIT_CONFIG
  );
  const [divingAnimationSprings, divingAnimationApi] = useSprings(
    EPICS_AMOUNT,
    DIVING_ANIMATION_INIT_CONFIG
  );
  const [divingCameraAnimationSpring, divingCameraAnimationApi] = useSpring(
    DIVING_CAMERA_ANIMATION_INIT_CONFIG
  );

  const onClick = (tileIndex: number) => {
    if (tileIndex === 3 && !landingDone) {
      landingAnimationApi.start(LANDING_ANIMATION_UPDATE);
      setTimeout(() => {
        setLandingDone(true);
      }, LANDING_DURATION);
    } else {
      if (activeEpicIndex === -1) {
        startDiving(divingAnimationApi, divingCameraAnimationApi, tileIndex);
        setActiveEpicIndex(tileIndex);
      } else {
        setActiveEpicIndex(tileIndex);
      }
    }
  };

  return (
    <>
      {TILE_CONFIGS.map((tileConfig, tileIndex) => (
        <animated.group key={tileIndex}>
          <Tile
            tileIndex={tileIndex}
            active={tileIndex === activeEpicIndex}
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
            onClick={() => onClick(tileIndex)}
            text={EPICS[tileIndex]}
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
    </>
  );
};
