import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import IconLoader from "../../../component/Loader";
export default function Antrian() {
  const [klinikList, setKlinikList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/klinikpagi/all"
        );
        setKlinikList(response.data);
      } catch (error) {
        toast.error("Tidak Bisa Mengambil Data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (to) => {
    setLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    delay(1000)
      .then(() => {
        localStorage.setItem("klinikId", klinikList.klinikId);
        window.location.href = to;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <IconLoader />}
      <Sidebar />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {klinikList.map((klinik) => (
              <a
                onClick={() => handleNavigation(`/ambil-antrian/${klinik.id}`)}
                className="text-decoration-none bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <p className="hidden"> {klinik.klinikId}</p>
                    <h2 className="text-xl font-bold text-rose-700">
                      {klinik.namaKlinik}
                    </h2>

                    <p>{klinik.statusKlinik}</p>
                  </div>
                  <hr className="text-rose-500 mt-1 w-full" />
                  <div className="flex justify-content-between mt-3">
                    <div className="flex flex-col text-sm text-gray-900">
                      <div className="flex justify-around gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          className="w-3"
                        >
                          <path
                            fill="#e51515"
                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                          />
                        </svg>
                        <span>Purbalingga , Jawa Tengah</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex justify-around">
                    <p className="text-gray-400">{klinik.tanggalWaktu}</p>
                    <div className="flex justify-around gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3"
                        viewBox="0 0 576 512"
                      >
                        {" "}
                        <path
                          fill="#e51515"
                          d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"
                        />
                      </svg>
                      <span>{klinik.noAntrian} Tersisa</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* <a
              href="/ambilantrian/:klinikId"
              className="bg-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-rose-700">
                    RS Pemalang
                  </h2>

                  <p>Negeri</p>
                </div>
                <hr className="text-rose-500 mt-1 w-full" />
                <div className="flex justify-content-between mt-3">
                  <div className="flex flex-col text-sm text-gray-900">
                    <div className="flex justify-around gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-3"
                      >
                        <path
                          fill="#e51515"
                          d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                        />
                      </svg>
                      <span>Pemalang , Jawa Tengah</span>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-around">
                  <p className="text-gray-400">25 Maret 2024</p>
                  <div className="flex justify-around gap-1 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3"
                      viewBox="0 0 576 512"
                    >
                      {" "}
                      <path
                        fill="#e51515"
                        d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"
                      />
                    </svg>
                    <span>0 Tersisa</span>
                  </div>
                </div>
              </div>
            </a> */}
          </div>
        </section>
      </div>
    </>
  );
}
