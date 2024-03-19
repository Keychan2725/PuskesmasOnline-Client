import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateReg({ children }) {
  const location = useLocation();
  if (!localStorage.getItem("id") || localStorage.getItem("role") !== "user") {
    return <Navigate to="/register-user" state={{ from: location }} />;
  }
  return children;
}

export default PrivateReg;