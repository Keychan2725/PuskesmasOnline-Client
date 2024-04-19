import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateSuperAdmin({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role") !== "super_admin") {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default PrivateSuperAdmin;