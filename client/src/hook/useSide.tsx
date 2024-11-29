import { useContext } from "react";

// auth provider
import { SideContext } from "../context/SideContext";

// ==============================|| AUTH HOOKS ||============================== //

const useSide = () => {
  const context = useContext(SideContext);
  if (!context) {
    throw new Error("useSideContext must be used within a SideProvider");
  }
  return context;
};

export default useSide;
