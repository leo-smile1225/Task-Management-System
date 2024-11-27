"use client";
import React, { ReactNode, createContext, useState } from "react";
export const SideContext = createContext({
  isSideview: false,
  setShow: (view: boolean) => {},
  // islogined: false,
  // login : (islog)=>{}
});

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
