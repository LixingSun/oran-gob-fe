import "./App.css";
import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { CANVAS_BG_COLOR } from "./constants/config";

import { EpicTiles } from "./components/EpicTiles";
import { EpicMenu } from "./components/EpicMenu";

const App: FC = () => {
  return (
    <div className="layout">
      <Canvas onCreated={(state) => state.gl.setClearColor(CANVAS_BG_COLOR)}>
        <directionalLight
          position={[40, 70, 100]}
          intensity={1}
          color={"#FFFFFF"}
        />

        <EpicTiles />
      </Canvas>

      <EpicMenu />
    </div>
  );
};

export default App;
