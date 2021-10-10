import create from "zustand";
import { INoteItem } from "../types/notes";

interface IEpicMenuStore {
  menuList: INoteItem[];
  setMenuList: (list: INoteItem[]) => void;
}

export const useEpicMenuStore = create<IEpicMenuStore>((set) => ({
  menuList: [],
  setMenuList: (list: INoteItem[]) => set(() => ({ menuList: list })),
}));
