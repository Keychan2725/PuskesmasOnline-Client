import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateNomerAntrian({ children }) {
  const location = useLocation();
  if (localStorage.getItem("idAntrian") == null) {
    return <Navigate to="/ambil-antrian/:klinikId" state={{ from: location }} />;
  }
  return children;
}

export default PrivateNomerAntrian;
