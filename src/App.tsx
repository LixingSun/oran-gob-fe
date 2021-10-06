import "./App.css";
import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { animated } from "@react-spring/three";
import { useSprings } from "@react-spring/core";
import { DEFAULT_SECTIONS, TILE_CONFIGS } from "./constants/config";
import { Tile } from "./components/Tile";
import { AnimateCamera } from "./components/AnimatedCamera";
import {
  LANDING_ANIMATION_INIT_CONFIG,
  LANDING_ANIMATION_UPDATE,
  TILE_HOVER_ANIMATION_INIT_CONFIG,
} from "./constants/animation";

const App: FC = () => {
  const [hoverAnimationSprings, hoverAnimationApi] = useSprings(
    DEFAULT_SECTIONS.length,
    TILE_HOVER_ANIMATION_INIT_CONFIG
  );

  const [landingAnimationSprings, landingAnimationApi] = useSprings(
    DEFAULT_SECTIONS.length,
    LANDING_ANIMATION_INIT_CONFIG
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
                }
              }}
              text={DEFAULT_SECTIONS[tileIndex]}
            />
          </animated.group>
        ))}

        <AnimateCamera cameraZ={landingAnimationSprings[0].cameraZ} />
      </Canvas>
    </div>
  );
};

export default App;
