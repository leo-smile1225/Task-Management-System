"use client";
import {
  AppProviderProps,
  ContextProps,
  // myJwtPayload,
  UserProps,
} from "@/utils/interfacelist";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import setAuthToken from "@/utils/setAuthToken";

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AppProviderProps> = ({ children }) => {
  const navigate = useRouter();
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("usertoken");
      if (token) {
        setAuthToken(token);
        const currentUser = jwtDecode(token);
        console.log(currentUser);
        const expires = currentUser.exp;
        console.log(Date.now() / 1000, expires);
        if (expires && Date.now() / 1000 < expires) {
          login(currentUser);
        } else {
          logout();
          navigate.push("/");
        }
      } else {
        navigate.push("/");
      }
    }
  }, [navigate]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (newUser: UserProps) => {
    setIsLoggedIn(true);
    setUser(newUser);
    console.log(newUser);
  };

  const logout = () => {
    navigate.push("/");
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
