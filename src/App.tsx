import "./App.css";
import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { CANVAS_BG_COLOR } from "./constants/config";

import { EpicTiles } from "./components/EpicTiles";
import { FRONTEND_NOTES } from "./notes/frontend";
import { INoteItem } from "./types/notes";
import { useActiveEpicIndexStore } from "./stores/useActiveEpicIndexStore";

const CONTENT_LIST = [FRONTEND_NOTES, [], [], [], [], [], []];

const App: FC = () => {
  const activeEpicIndex = useActiveEpicIndexStore(
    (state) => state.activeEpicIndex
  );

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

      {activeEpicIndex >= 0 && (
        <div className="layout__list">
          {CONTENT_LIST[activeEpicIndex].map((noteItem: INoteItem) => (
            <p key={noteItem.title}>{noteItem.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
