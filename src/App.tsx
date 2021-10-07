import "./App.css";
import React, { FC, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { animated } from "@react-spring/three";
import { useSprings, useSpring } from "@react-spring/core";
import { DEFAULT_SECTIONS, TILE_CONFIGS } from "./constants/config";
import { Tile } from "./components/Tile";
import { AnimateCamera } from "./components/AnimatedCamera";
import {
  DIVING_ANIMATION_INIT_CONFIG,
  DIVING_ANIMATION_UPDATE,
  LANDING_ANIMATION_INIT_CONFIG,
  LANDING_ANIMATION_UPDATE,
  LANDING_DURATION,
  TILE_HOVER_ANIMATION_INIT_CONFIG,
} from "./constants/animation";

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

  const [divingAnimationSpring, divingAnimationApi] = useSpring(
    DIVING_ANIMATION_INIT_CONFIG
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

        {TILE_CONFIGS.map((tileConfig, tileIndex) => (
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
                  landingAnimationApi.start(LANDING_ANIMATION_UPDATE);
                  setTimeout(() => {
                    setLandingDone(true);
                  }, LANDING_DURATION);
                } else {
                  divingAnimationApi.start(DIVING_ANIMATION_UPDATE);
                }
              }}
              text={DEFAULT_SECTIONS[tileIndex]}
            />
          </animated.group>
        ))}

        <AnimateCamera
          cameraX={divingAnimationSpring.cameraX}
          cameraY={divingAnimationSpring.cameraY}
          cameraZ={
            landingDone
              ? divingAnimationSpring.cameraZ
              : landingAnimationSprings[0].cameraZ
          }
        />
      </Canvas>
    </div>
  );
};

export default App;
