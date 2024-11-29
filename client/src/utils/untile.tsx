export const getUrl = (url: string) => {
  if (url.includes("home")) return "Home";
  else if (url.includes("login")) return "Login";
  else if (url.includes("register")) return "Register";
  else if (url.includes("profile")) return "Profile";
  else if (url.includes("setting")) return "Setting";
  else if (url.includes("dashboard")) return "DashBoard";
  else if (url.includes("setting")) return "Setting";
  else if (url.includes("setting")) return "Setting";
};

export const BackendURL = "http://192.168.142.171:5000/api";
export const LoginURL = BackendURL + "/auth/signin";
export const RegisterURL = BackendURL + "/auth/signup";
