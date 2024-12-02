import { userLogInterface, userRegInterface } from "@/utils/interfacelist";
import setAuthToken from "@/utils/setAuthToken";
import {
  getAllGroupURL,
  groupcreateURL,
  LoginURL,
  RegisterURL,
} from "@/utils/untile";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const authRegister = async (userdata: userRegInterface) => {
  const { data } = await axios.post(RegisterURL, userdata);
  console.log(JSON.stringify(data));
  return data;
};

export const authLogin = async (userdata: userLogInterface) => {
  const { data } = await axios.post(LoginURL, userdata);
  if (data.token) {
    const decoded = jwtDecode(data.token);
    setAuthToken(data.token);
    setSession(data.token);
    return { status: true, decoded: decoded };
  } else {
    setAuthToken("");
    setSession("");
    return { status: false, message: data.message };
  }
};
const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem("usertoken", serviceToken);
  } else {
    localStorage.removeItem("usertoken");
  }
};
export const setCurrentUser = () => {
  const storedData = localStorage.getItem("usertoken");
  console.log("=>", storedData);
  if (!storedData) return null;
  try {
    const decoded = jwtDecode(storedData);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createGroup = async (
  id: string | undefined,
  groupName: string
) => {
  console.log(id, groupName);

  const { data } = await axios.post(groupcreateURL, { id, groupName });
  console.log(data);
};

export const getAllGroup = async () => {
  const { data } = await axios.get(getAllGroupURL);
  console.log(data);
  return data;
};
