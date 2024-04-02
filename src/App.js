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
import PrivateNomerAntrian from "./router/PrivateNomerAntrian.js";
import PrivateAdmin from "./router/PrivateAdmin.js";
import DashboardAdmin from "./pages/admin/Dashboard.js";
import SetingAntrian from "./pages/admin/SetingAntrian.js";
import HistoryAntrian from "./pages/admin/HistoryAntrian.js";
import PrivateOtpAdmin from "./router/PrivateOtpAdmin.js";
import PrivateOtpUser from "./router/PrivateOtpUser.js";
import HistoryAntrianUser from "./pages/user/HistoryAntrianUser.js";
import PublikKlinik from "./pages/PublikKlinik.js";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sidebar-admin" element={<SidebarAdmin />} />
          <Route path="/sidebar-super-admin" element={<SidebarSuperAdmin />} />
          <Route
            path="/register-user"
            element={
              <PrivateOtpUser>
                <RegisterUser />
              </PrivateOtpUser>
            }
          />
          <Route
            path="/register-admin"
            element={
              <PrivateOtpAdmin>
                <RegisterAdmin />
              </PrivateOtpAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/publik-klinik/:id" element={<PublikKlinik />} />
          <Route path="/sidebar" element={<Sidebarr />} />
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
          <Route
            path="/nomer-antrian"
            element={
              <PrivateRoute>
                <Antrian />
              </PrivateRoute>
            }
          />
          <Route
            path="/history-antrian"
            element={
              <PrivateAdmin>
                <HistoryAntrian />
              </PrivateAdmin>
            }
          />
          <Route
            path="/detail-nomer-antrian/:id"
            element={
              <PrivateRoute>
                <DetailNomerAntrian />
              </PrivateRoute>
            }
          />
          <Route
            path="/ambil-antrian/:id"
            element={
              <PrivateRoute>
                <AmbilAntrian />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-user"
            element={
              <PrivateRoute>
                <DashboardUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/history-antrian-user"
            element={
              <PrivateRoute>
                <HistoryAntrianUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-admin"
            element={
              <PrivateAdmin>
                <DashboardAdmin />
              </PrivateAdmin>
            }
          />
          <Route
            path="/seting-antrian"
            element={
              <PrivateAdmin>
                <SetingAntrian />
              </PrivateAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
