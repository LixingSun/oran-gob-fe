import create from "zustand";

interface IActiveNoteStore {
  note: string;
  setNote: (text: string) => void;
}

export const useActiveNoteStore = create<IActiveNoteStore>((set) => ({
  note: "",
  setNote: (note: string) => set(() => ({ note })),
}));
