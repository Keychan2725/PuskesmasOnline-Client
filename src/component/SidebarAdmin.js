/*eslint-disable*/
import React, { useEffect, useState } from "react";

import Logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import IconLoader from "./Loader";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const AuthToken = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usia, setUsia] = useState("");
  const [password, setPassword] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [loading, setLoading] = useState(false);

  const getAkun = async () => {
    try {
      const token = await AuthToken;
      const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const dataUser = res.data;
      setEmail(dataUser.data.email);
      setPassword(dataUser.data.password);
      setUsername(dataUser.data.username);
      setUsia(dataUser.data.usia);
      setImgUser(dataUser.data.imgUser);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  useEffect(() => {
    getAkun();
  });
  const handleLogout = () => {
    localStorage.clear();
    // Navigasi ke halaman home setelah logout
    navigate("/");
  };
  const logout = () => {
    Swal.fire({
      title: "Keluar",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
      }
    });
  };

  const handleNavigation = (to) => {
    setLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    delay(1000)
      .then(() => {
        window.location.href = to;
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
  const reloadPage = () => {
    setLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    delay(1000)
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <IconLoader />}

      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-700 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-red-500  to-gray-900">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <button onClick={() => reloadPage()} className="flex ms-2 md:me-16">
                <img src={Logo} className="h-12 me-3" alt="FlowBite Logo" />
                <span className="   self-center text-xl text-white font-semibold sm:text-2xl whitespace-nowrap  ">
                  PUSLINE
                </span>
              </button>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                data-dropdown-toggle="dropdown-notification"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              <div
                id="dropdown-notification"
                className="z-50 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-notification"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Notification 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Notification 2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Notification 3
                    </a>
                  </li>
                </ul>
              </div>
              <a
                onClick={() => handleNavigation("/akun-admin")}
                className="text-decoration-none"
              >
                {" "}
                <button
                  type="button"
                  className="ml-4 flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-500"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      imgUser === null
                        ? "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                        : imgUser
                    }
                    alt="user photo"
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-700 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={() => handleNavigation("/dashboard-admin")}
                className="flex items-center p-2 text-gray-100 rounded-lg  hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                  />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/seting-antrian")}
                className="flex items-center p-2 text-gray-100 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z"
                  />
                </svg>

                <span className="ms-3">Seting Antrian</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/history-antrian")}
                className="flex items-center p-2 text-gray-100 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                  />
                </svg>

                <span className="ms-3">History Antrian</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/reservasi-operasi")}
                className="flex items-center p-2 text-gray-100 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.5 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4.5M7 11V7a3 3 0 0 1 6 0v1.5m2.5 5.5v1.5l1 1m3.5-1a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                  />
                </svg>

                <span className="ms-3">Reservasi Operasi</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/akun-admin")}
                className="flex items-center p-2 text-gray-100 rounded-lg   hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 hover:text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="ms-3">Akun</span>
              </a>
            </li>
          </ul>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <a
              onClick={logout}
              className="flex items-center justify-start w-full py-2 text-gray-100 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-8"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#ff0000"
                  d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"
                />
              </svg>
              <span className="mr-2">Log Out</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
