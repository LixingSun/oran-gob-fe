import "./App.css";
import React, { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { CANVAS_BG_COLOR } from "./constants/config";

import { EpicTiles } from "./components/EpicTiles";
import { EpicMenu } from "./components/EpicMenu";
import { useActiveEpicIndexStore } from "./stores/useActiveEpicIndexStore";

import ReactMarkdown from "react-markdown";
import { useActiveNoteStore } from "./stores/useActiveNoteStore";

const App: FC = () => {
  const activeEpicIndex = useActiveEpicIndexStore(
    (state) => state.activeEpicIndex
  );
  const note = useActiveNoteStore((state) => state.note);

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

      {activeEpicIndex > -1 && (
        <div className="layout__main">
          <EpicMenu />

          <div className="layout__content">
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={note} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
