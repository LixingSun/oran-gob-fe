import React, { FC } from "react";
import { useEpicMenuStore } from "../stores/useEpicMenuStore";
import { useActiveNoteStore } from "../stores/useActiveNoteStore";

export const EpicMenu: FC = () => {
  const menuList = useEpicMenuStore((state) => state.menuList);
  const setNote = useActiveNoteStore((state) => state.setNote);

  return (
    <ul className="layout__menu">
      {menuList.map((noteItem) => (
        <li
          key={noteItem.title}
          onClick={() => {
            fetch(noteItem.file)
              .then((response) => response.text())
              .then((text) => {
                setNote(text);
              });
          }}
        >
          {noteItem.title}
        </li>
      ))}
    </ul>
  );
};
