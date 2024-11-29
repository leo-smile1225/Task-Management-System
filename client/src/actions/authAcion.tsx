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
  return data;
};

export const authLogin = async (userdata: userLogInterface) => {
  const { data } = await axios.post(LoginURL, userdata);
  console.log(data);
  if (data.token) {
    const decoded = jwtDecode(data.token);
    setAuthToken(data.token);
    setSession(data.token);
    return decoded;
  } else {
    setAuthToken("");
    setSession("");
    return data.message;
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
  const decoded = jwtDecode(storedData);

  if (storedData) {
    return decoded;
  }
};

// export const getAllmember = async ()
