import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRegAdmin({ children }) {
  const location = useLocation();
  if (!localStorage.getItem("id") || localStorage.getItem("role") !== "admin") {
    return <Navigate to="/register-admin" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRegAdmin;