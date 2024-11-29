import { useContext } from "react";

// auth provider
import { AuthContext } from "../context/AuthContext";

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
