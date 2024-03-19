import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import RegisterUser from "./pages/auth/RegisterUser.js";
import Login from "./pages/auth/Login.js";
import PrivateRoute from "./router/PrivateRoute.js";
import DashboardUser from "./pages/user/DashboardUser.js";
import RegisterAdmin from "./pages/auth/RegisterAdmin.js";
import Otp from "./pages/otp/Otp.js";
import PrivateReg from "./router/PrivateReg.js";
import PrivateRegAdmin from "./router/PrivateRegAdmin.js";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/otp-user" element={
            <PrivateReg>
              <Otp />
            </PrivateReg>
          } />
          <Route path="/otp-admin" element={
            <PrivateRegAdmin>
              <Otp />
            </PrivateRegAdmin>
          } />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
