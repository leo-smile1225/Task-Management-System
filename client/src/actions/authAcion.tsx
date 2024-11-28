import setAuthToken from "@/utils/setAuthToken";
import { LoginURL, RegisterURL } from "@/utils/untile";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
interface userRegInterface {
  email: string;
  username: string;
  password: string;
  password2: string;
}
interface userLogInterface {
  email: string;
  password: string;
}

export const authRegister = async (userdata: userRegInterface) => {
  const { data } = await axios.post(RegisterURL, userdata);
  console.log(JSON.stringify(data));
  if (data.user) {
    return true;
  } else {
    return false;
  }
};

export const authLogin = async (userdata: userLogInterface) => {
  const { data } = await axios.post(LoginURL, userdata);
  console.log(data);
  if (data.success) {
    const decoded = jwtDecode(data.token);
    setAuthToken(data.token);
    setSession(data.token);
    return decoded;
  } else {
    setAuthToken("");
    setSession("");
    return null;
  }
};
const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem("usertoken", serviceToken);
  } else {
    localStorage.removeItem("usertoken");
  }
};

// export const getAllmember = async ()
