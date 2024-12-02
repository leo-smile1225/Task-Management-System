import { userLogInterface, userRegInterface } from "@/utils/interfacelist";
import setAuthToken from "@/utils/setAuthToken";
import {
  allowUserURL,
  getAllUsersURL,
  LoginURL,
  RegisterURL,
} from "@/utils/untile";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getAllUser = async (type: string) => {
  const { data } = await axios.post(getAllUsersURL, { type: type });
  console.log(data);
  return data;
};

export const allowUser = async (_id: React.Key, allowed: boolean) => {
  const { data } = await axios.post(allowUserURL, { _id, allowed });
};
