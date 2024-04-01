import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateOtpUser({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role") == "user") {
    return <Navigate to="/otp-user" state={{ from: location }} />;
  }  
  return children;
}

export default PrivateOtpUser;
