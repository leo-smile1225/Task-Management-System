export const getUrl = (url: string) => {
  if (url.includes("home")) return "Home";
  else if (url.includes("login")) return "Login";
  else if (url.includes("register")) return "Register";
  else if (url.includes("profile")) return "Profile";
  else if (url.includes("setting")) return "Setting";
  else if (url.includes("dashboard")) return "DashBoard";
  else if (url.includes("admin")) return "Admin";
  else if (url.includes("setting")) return "Setting";
  else if (url.includes("report")) return "Report";
  else if (url.includes("membermanagement")) return "User management";
  else if (url.includes("taskmanagement")) return "Task management";
  else if (url.includes("task")) return "Task";
};

// export const BackendURL = "http://127.0.0.1:5000/api";
export const BackendURL = "http://192.168.142.171:5000/api";

export const LoginURL = BackendURL + "/auth/signin";
export const RegisterURL = BackendURL + "/auth/signup";
export const getAllUsersURL = BackendURL + "/auth/getAllUsers";
export const allowUserURL = BackendURL + "/auth/allowUser";

export const groupcreateURL = BackendURL + "/auth/createGroup";
export const getAllGroupURL = BackendURL + "/auth/getAllGroup";
export const reportSaveURL = BackendURL + "/auth/reportSave";
export const getReportURL = BackendURL + "/auth/getReport";
export const deleteReportURL = BackendURL + "/auth/delReport";
export const updateUserURL = BackendURL + "/auth/updateUser";
export const updateSubtaskRUL = BackendURL + "/task/updateTask";
export const getAllSubtaskURL = BackendURL + "/task/getAllSubtask";
