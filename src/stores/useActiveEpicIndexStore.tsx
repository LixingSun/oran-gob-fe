import create from "zustand";

interface IActiveEpicIndexStore {
  activeEpicIndex: number;
  setActiveEpicIndex: (index: number) => void;
}

export const useActiveEpicIndexStore = create<IActiveEpicIndexStore>((set) => ({
  activeEpicIndex: -1,
  setActiveEpicIndex: (index: number) =>
    set(() => ({ activeEpicIndex: index })),
}));
