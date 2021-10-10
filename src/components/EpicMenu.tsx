import React, { FC } from "react";
import { useEpicMenuStore } from "../stores/useEpicMenuStore";

export const EpicMenu: FC = () => {
  const menuList = useEpicMenuStore((state) => state.menuList);

  return (
    <ul className="layout__list">
      {menuList.map((noteItem) => (
        <li key={noteItem.title}>{noteItem.title}</li>
      ))}
    </ul>
  );
};
