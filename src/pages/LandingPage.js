import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Logo from "../asset/logo.png";
import Swal from "sweetalert2";
import Gambar from "../asset/2.jpg";
import "./landingpage.css";
import emailjs from "@emailjs/browser";

const api = "http://localhost:8080/api/admin/dataklinik/all";
export default function LandingPage() {
  const [getKlinik, setGetklinik] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const form = useRef();

  const searchInputRef = useRef();
  const klinikListRef = useRef();

  const klinik = async () => {
    try {
      const response = await axios.get(`${api}`);
      setGetklinik(response.data);
    } catch (error) {
      console.log(error);
      setGetklinik([]);
    }
  };

  const handleSubmit = (selectedKlinik) => {
    if (selectedKlinik) {
      const klinikId = selectedKlinik.id;
      window.location.href = `/publik-klinik/${klinikId}`;
    } else {
      Swal.fire({
        icon: "warning",
        text: "Klinik Tidak Ditemukan",
      });
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
    const matchingKlinik = getKlinik.filter(
      (klinik) =>
        klinik.namaKlinik &&
        klinik.namaKlinik.toLowerCase().startsWith(searchTerm)
    );
    setSearchResults(matchingKlinik);
  };

  useEffect(() => {
    klinik();
  }, []);

  const Terima = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/users/status/terima/${id}`, {
        status: "Diterima",
      });
      Swal.fire({
        icon: "success",
        title: "Menerima users",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const non_aktif = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/status/non-aktif/${id}`,
        {
          status: null,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Non Aktif users",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const deleteUser = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data users ini? Pastikan sudah memberikan pemberitahuan melalui email",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/users/${id}`);
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menghapus!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan saat menghapus data",
          });
        }
      }
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ztyk8vk",
        "template_vcnpzvc",
        form.current,
        "-Bw1Ibwk-iGxtih6p"
      )
      .then(
        (result) => {
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          }
        },
        (error) => {
          if (error) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Gagal Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
  };

  return (
    <>
      <header>
        <nav className={`sticky top-0 w-full h-16 z-10 bg-rose-500`}>
          <div className="flex items-center justify-between flex-grow">
            <div className="flex items-center">
              <img
                src={Logo}
                className="mx-34 h-16 sm:h-18"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                PUSLINE
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <a
                  href="/login"
                  className="text-white focus:ring-4 focus:ring-gray-300 focus:hover:bg-rose-300  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-rose-300 focus:outline-none dark:focus:ring-gray-300"
                >
                  Masuk
                </a>
                <a
                  href="/register-user"
                  className="text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-900 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-500"
                >
                  Registrasi
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-gray-100">
        <div className="  grid  max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:px-16  lg:grid-cols-12  ">
          <div className=" place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 mx-auto text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-rose-600">
              PUSLINE
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lglg:text-xl dark:text-gray-800">
              Kami Peduli Dengan Kesehatan Anda
            </p>

            <div className="w-75 pt-4 flex-row items-center relative">
              <div className="mr-4 flex-grow">
                <input
                  id="searchKlinik"
                  type="text"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Cari klinik"
                  ref={searchInputRef}
                  onChange={handleSearch}
                />
              </div>
              <div
                id="klinikList"
                className={`text-gray-950 dark:text-gray-950 p-1 absolute left-0 top-full w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${
                  searchQuery.length === 0 ? "hidden" : ""
                }`}
                ref={klinikListRef}
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {searchQuery.length > 0 && (
                  <>
                    {searchResults.length === 0 && (
                      <div className="p-2">Klinik Tidak Ditemukan</div>
                    )}
                    {searchResults.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`list-item text-start ${
                          searchInputRef.current === document.activeElement
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleSubmit(suggestion)}
                      >
                        {suggestion.namaKlinik}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden rounded-s-full  lg:mt-0 lg:col-span-5 lg:flex">
            <img src={Gambar} alt="mockup" />
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-rose-600 lg:h-12 lg:w-12 dark:bg-rose-600">
                <svg
                  className="w-5 h-5 text-gray-200 lg:w-6 lg:h-6 dark:text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.75 6a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 3a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm-1.75 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H3.25zM15.25 18a.75.75 0 100 1.5h1.5a.75.75 0 100-1.5h-1.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-dark">
                {" "}
                Info Layanan Kesehatan : Menyediakan Informasi Layanan Kesehatan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                PUSLINE memperkenalkan fitur Info Layanan, yang memungkinkan
                pengguna menjelajahi halaman detail suatu tempat layanan
                kesehatan dengan mudah.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-rose-600 lg:h-12 lg:w-12 dark:bg-rose-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-200 lg:w-6 lg:h-6 dark:text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 576 512"
                >
                  {" "}
                  <path
                    fill="#fcfcfc"
                    d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-dark">
                {" "}
                Nomer Antri Online: Menyediakan Nomer Antri Online Supaya
                Mempermudah Anda
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Fitur Nomer Antri Online ini membuat supaya tidak perlu datang
                ke tempat layanan berada untuk mengambil nomer antrian untuk
                periksa kesehatan
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-rose-600 lg:h-12 lg:w-12 dark:bg-rose-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-200 lg:w-6 lg:h-6 dark:text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fafafa"
                    d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-dark">
                Reservasi Pemeriksaan dan Operasi : Manajemen Tempat Layanan
                Akan Melakukan Koordinasi Dengan Anda
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Anda dapat melakukan reservasi pemeriksaan dan operasi dengan
                web ini
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-800 sm:text-lg dark:text-gray-800">
            <h2 className="mb-4 text-4xl font-extrabold text-rose-600 text-rose-600">
              PUSLINE
            </h2>
            <p className="mb-4">
              Merupakan Web dengan bertemakan Medis dan Layanan Kesehatan , yang
              bisa membuat pasien atau client dari suatu tempat layanan
              kesehatan dapat melakukan koordinasi maupun mempermudah dalam hal
              lainya
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://kanalpengetahuan.fk.ugm.ac.id/wp-content/uploads/sites/1156/2018/07/hari-ini.jpg"
              alt="Puskesmas Online"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://storyblok-cdn.ef.com/f/60990/1200x666/3e98e246e8/istilah-medis-bahasa-inggris.jpg"
              alt="Puskesmas Online"
            />
          </div>
        </div>
      </section>

      <footer className="bg-blue-100/80 font-sans dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                Saran Dan Masukan
              </h1>
              <form ref={form} onSubmit={sendEmail}>
                {" "}
                <div className=" flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row gap-2 my-5">
                  <div className="sm:grid-cols-1">
                    <input
                      id="email"
                      type="text"
                      name="from_user"
                      className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-100 focus:border-blue-200 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Email "
                    />
                  </div>
                  <div className="sm:grid-cols-1">
                    <input
                      id=""
                      type="text"
                      name="message"
                      className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-100 focus:border-blue-200 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Saran dan Masukan"
                    />
                  </div>

                  <button className=" bg-rose-500 w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Kirim
                  </button>
                </div>
              </form>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Industries
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Retail & E-Commerce
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Information Technology
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Finance & Insurance
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Beri Rating
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Retail & E-Commerce
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Information Technology
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Finance & Insurance
                </p>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4 hover:cursor-pointer">
              <img
                src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
                width="130"
                height="110"
                alt=""
              />
              <img
                src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
                width="130"
                height="110"
                alt=""
              />
            </div>

            <div className="flex gap-4 hover:cursor-pointer">
              <img
                src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                width="30"
                height="30"
                alt="fb"
              />
              <img
                src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
                width="30"
                height="30"
                alt="tw"
              />
              <img
                src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
                width="30"
                height="30"
                alt="inst"
              />
              <img
                src="https://www.svgrepo.com/show/94698/github.svg"
                className=""
                width="30"
                height="30"
                alt="gt"
              />
           
            </div>
          </div>
          <p className=" text-white font-sans p-8 text-start md:text-center md:text-lg md:p-4">
            © 2024 Puskesmas Online 
          </p>
        </div>
      </footer>

      {/* modal */}
      {/* modal  */}
      {openModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Registrasi</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 opacity-20 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  <div className="space-y-4 p-3">
                    <div className="py-3">
                      <p className="text-lg font-medium mt-5">
                        Silahkan Pilih Metode Registrasi{" "}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
                      <a
                        href="/register-admin"
                        className="text-white bg-red-700 font-bold uppercase px-6 py-3.5 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Admin
                      </a>
                      <a
                        href="/register-user"
                        className="bg-gradient-to-r from-[#0b409c] to-[#10316b] text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        User
                      </a>
                    </div>
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
