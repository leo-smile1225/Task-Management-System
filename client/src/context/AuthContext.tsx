"use client";
import React, { createContext, useState, ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface UserProps {
  _id?: string;
  username?: string;
  email?: string;
  role?:string,
  status?: {
    currentStatus?: string;
    currentEarning?: string;
    expectedEarning?: string;
  };
  groupID?: string;
}

interface ContextProps {
  isLoggedIn: boolean;
  user: UserProps | null;
  login: (user: UserProps) => void;
  logout: () => void;
}

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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
