export const getUrl = (url: string) => {
  if (url.includes("home")) return "Home";
  else if (url.includes("login")) return "Login";
  else if (url.includes("register")) return "Register";
  else if (url.includes("profile")) return "Profile";
  else if (url.includes("setting")) return "Setting";
};

export const BackendURL = "http://127.0.0.1:5000/api";
export const LoginURL = BackendURL + "/users/login";
export const RegisterURL = BackendURL + "/users/register";
