import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateAdmin({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateAdmin;