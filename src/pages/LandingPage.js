import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../asset/logo.png";
import Swal from "sweetalert2";
import Gambar from "../asset/2.jpg";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
const api = "http://localhost:8080/api/user/all";

export default function LandingPage() {
  const [getSekolah, setGetSekolah] = useState([]);

  const sekolah = async () => {
    try {
      const response = await axios.get(`${api}`);
      setGetSekolah(response.data);
    } catch (error) {
      console.log(error);
      setGetSekolah([]);
    }
  };

  const handleSubmit = (selectedSekolah) => {
    if (selectedSekolah) {
      const sekolahId = selectedSekolah.id;
      window.location.href = `/publik-sekolah/${sekolahId}`;
    } else {
      const searchTerm = searchInput.value.toLowerCase();
      const matchingSchools = getSekolah.filter((sekolah) =>
        sekolah.namaSekolah.toLowerCase().includes(searchTerm)
      );

      if (matchingSchools.length) {
        const matchingSchool = matchingSchools[0];
        window.location.href = `/publik-sekolah/${matchingSchool.id}`;
      } else {
        Swal.fire({
          icon: "warning",
          text: "Sekolah Tidak Ditemukan",
        });
      }
    }
  };

  const searchInput = document.getElementById("searchSekolah");
  const schoolList = document.getElementById("schoolList");
  let inputTimeout;

  const handleSearch = (e) => {
    clearTimeout(inputTimeout);

    const searchTerm = e.target.value.toLowerCase();

    inputTimeout = setTimeout(() => {
      if (schoolList) {
        schoolList.innerHTML = "";
      }

      if (searchTerm) {
        const loadingIndicator = document.createElement("div");
        loadingIndicator.textContent = "Loading...";
        schoolList.appendChild(loadingIndicator);

        const suggestions = getSuggestions(searchTerm);

        schoolList.removeChild(loadingIndicator);

        suggestions.forEach((suggestion) => {
          const listItem = document.createElement("div");
          listItem.classList.add("list-item");
          listItem.textContent = suggestion.value;

          listItem.addEventListener("click", () => {
            searchInput.value = suggestion.value;
            handleSubmit(suggestion.data);
            handleSearch(e);
            listItem.classList.add("hover");
          });

          listItem.addEventListener("mouseleave", () => {
            listItem.classList.remove("hover");
          });

          schoolList.appendChild(listItem);
          const hr = document.createElement("hr");
          schoolList.appendChild(hr);
        });
      }
    }, 500);
  };

  const getSuggestions = (searchTerm) => {
    const suggestions = [];
    for (const sekolah of getSekolah) {
      if (sekolah.namaSekolah.toLowerCase().startsWith(searchTerm)) {
        suggestions.push({
          data: sekolah,
          value: sekolah.namaSekolah,
        });
      }
    }
    return suggestions;
  };

  useEffect(() => {
    sekolah();
  }, []);

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-rose-600">
          <div className="flex items-center lg:order-2 md:flex justify-between flex-grow">
            <div className="flex justify-between">
              <img
                src={Logo}
                className="mx-34 h-16 sm:h-18"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                PUSLINE
              </span>
            </div>

            <div className="flex items-center lg:order-2">
              <a
                href="/login"
                className=" text-white focus:ring-4 focus:ring-gray-300 focus:hover:bg-rose-300  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-rose-300 focus:outline-none dark:focus:ring-gray-300"
              >
                Masuk
              </a>
              <a
                href="/register"
                className=" bg-gray-900 text-white focus:ring-4 focus:ring-white focus:hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-900 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-white"
              >
                Daftar
              </a>
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
            <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-800">
              Kami Peduli Dengan Kesehatan Anda
            </p>

            <div className="w-75 pt-4 flex flex-direction: column items-center">
              <div className="mr-4 flex-grow">
                <input
                  id="searchSekolah"
                  type="text"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark"
                  placeholder="Cari Layanan"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div
              id="schoolList"
              className="text-dark dark:text-dark  p-1 "
            ></div>
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

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <div className="flex justify-content-around-gap2">
                  <input
                    id="email"
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                  />
                  <input
                    id=""
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Saran dan Masukan"
                  />
                </div>

                <button className="bg-rose-500  w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Kirim
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Quick Link
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Home
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Who We Are
                </p>
                <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Our Philosophy
                </p>
              </div>
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
              <img
                src="https://www.svgrepo.com/show/22037/path.svg"
                width="30"
                height="30"
                alt="pn"
              />
              <img
                src="https://www.svgrepo.com/show/28145/linkedin.svg"
                width="30"
                height="30"
                alt="in"
              />
              <img
                src="https://www.svgrepo.com/show/22048/dribbble.svg"
                className=""
                width="30"
                height="30"
                alt="db"
              />
            </div>
          </div>
          <p className="font-sans p-8 text-start md:text-center md:text-lg md:p-4">
            © 2023 You Company Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}