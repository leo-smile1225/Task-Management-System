"use client";
import {
  AppProviderProps,
  ContextProps,
  UserProps,
} from "@/utils/interfacelist";
import React, { createContext, useState, ReactNode } from "react";

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (newUser: UserProps) => {
    setIsLoggedIn(true);
    setUser(newUser);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem("usertoken", "");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
