import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface IActiveEpicContext {
  activeEpicIndex: number;
  setActiveEpicIndex: Dispatch<SetStateAction<number>>;
}

export const ActiveEpicContext = createContext<IActiveEpicContext>({
  activeEpicIndex: -1,
  setActiveEpicIndex: () => void 0,
});

export const ActiveEpicProvider: FC = ({ children }) => {
  const [activeEpicIndex, setActiveEpicIndex] = useState<number>(-1);

  const saveSetting = (index) => {
    setActiveEpicIndex(index);
  };

  return (
    <ActiveEpicContext.Provider
      value={{
        activeEpicIndex,
        setActiveEpicIndex: saveSetting,
      }}
    >
      {children}
    </ActiveEpicContext.Provider>
  );
};
