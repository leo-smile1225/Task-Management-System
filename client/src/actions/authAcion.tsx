import { LoginURL, RegisterURL } from "@/untile";
import axios from "axios";

interface userRegInterface {
  email: string;
  username: string;
  password: string;
  passwordcon: string;
}
interface userLogInterface {
  email: string;
  password: string;
}

export const authRegister = async (userdata: userRegInterface) => {
  console.log(userdata);

  const { data } = await axios.post(RegisterURL, userdata);
  console.log(data);
};

export const authLogin = async (userdata: userLogInterface) => {
  console.log(userdata);

  const { data } = await axios.post(LoginURL, userdata);
  console.log(data);
};

// export const getAllmember = async ()
