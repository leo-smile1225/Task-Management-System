import { ReactNode } from "react";
import { JwtPayload } from "jwt-decode";

export interface AppProviderProps {
  children: ReactNode;
}

export interface UserProps {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  status?: {
    currentStatus?: string;
    currentEarning?: string;
    expectedEarning?: string;
  };
  avatar?: string;
}

export interface ContextProps {
  isLoggedIn: boolean;
  user: UserProps | null;
  login: (user: UserProps) => void;
  logout: () => void;
}

export interface userRegInterface {
  email: string;
  username: string;
  password: string;
  password2: string;
}
export interface userLogInterface {
  email: string;
  password: string;
}

export interface GroupListItem {
  value: string;
  label: string;
}

export interface Group {
  _id: string;
  name: string;
}
export interface ReportProps {
  _id: string;
  text: string;
  name: string[];
}
export interface ReportItemProps {
  _id: string;

  text: string;
  name: string;
}
export interface PayProps {
  status: boolean;
  message?: string;
  decoded?: any;
}

export interface GetuserProps {
  decoded?: any | null;
}

export interface TaskPropsItem {
  title: string;
  description: string;
}
export interface newUser extends UserProps {
  exp: number;
}

export interface upTaskProps {
  _id: string;
  status: string;
}
