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
import Sidebarr from "./component/Sidebar.js";
import SidebarAdmin from "./component/SidebarAdmin.js";
import SidebarSuperAdmin from "./component/SidebarSuperAdmin.js";
import Antrian from "./pages/user/antrian/Antrian.js";
import AmbilAntrian from "./pages/user/antrian/AmbilAntrian";
import DetailNomerAntrian from "./pages/user/antrian/DetailNomerAntrian.js";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/otp-user"
            element={
              <PrivateReg>
                <Otp />
              </PrivateReg>
            }
          />
          <Route
            path="/otp-admin"
            element={
              <PrivateRegAdmin>
                <Otp />
              </PrivateRegAdmin>
            }
          />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sidebar" element={<Sidebarr />} />
          <Route path="/nomer-antrian" element={<Antrian />} />
          <Route path="/detail-nomer-antrian/:idAntrian" element={<DetailNomerAntrian />} />
          <Route path="/ambil-antrian/:klinikId" element={<AmbilAntrian />} />
          <Route path="/sidebar-admin" element={<SidebarAdmin />} />
          <Route path="/sidebar-super-admin" element={<SidebarSuperAdmin />} />
          <Route
            path="/dashboard-user"
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
