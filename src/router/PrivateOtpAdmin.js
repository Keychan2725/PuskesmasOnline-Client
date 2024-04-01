import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateOtpAdmin({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role") === "admin") {
    return <Navigate to="/otp-admin" state={{ from: location }} />;
  }
  return children;
}

export default PrivateOtpAdmin;