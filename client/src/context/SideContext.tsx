"use client";
import React, { ReactNode, createContext, useState } from "react";

interface ContextProps {
  isSideview: boolean;
  setShow: (view: boolean) => void;
}

export const SideContext = createContext<ContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const SideProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isSideview, setShowside] = useState(false);

  const setShow = (view: boolean) => {
    setShowside(view);
  };

  return (
    <SideContext.Provider value={{ isSideview, setShow }}>
      {children}
    </SideContext.Provider>
  );
};
