import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import toast from "react-hot-toast";
import Aos from "aos";
import IconLoader from "../../../component/Loader";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function AmbilAntrian() {
  const deviceMode = useMediaQuery({ query: "(max-width: 767px)" });
  const dekstopMode = useMediaQuery({ query: "(min-width: 768px)" });
  const [openAntrian, setOpenAntrian] = useState(true);
  const [loading, setLoading] = useState(false);
  const [antrian, setAntrian] = useState("");
  const { id } = useParams();
  const [noAntrian, setNoAntrian] = useState("");
  const userId = localStorage.getItem("userId");

  const getDataAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/klinikpagi/get/${id}`
      );
      setAntrian(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Mengambil Data User");
    }
  };

  const userRequestTimestamps = new Map();

  const ambilTiket = async () => {
    try {
      const newAntrian = parseInt(antrian.noAntrian) - 1;
      const idUser = localStorage.getItem("userId");

      const lastAntrianTime = userRequestTimestamps.get(idUser);

      const currentTime = new Date().getTime();

      const timeDifference = lastAntrianTime
        ? currentTime - lastAntrianTime.getTime()
        : Infinity;

      const fifteenHoursInMilliseconds = 15 * 60 * 60 * 1000;

      if (timeDifference < fifteenHoursInMilliseconds) {
        toast.error("Anda sudah mengambil antrian untuk hari ini");
        return;
      }

      const [klinikPagiResponse, antrianResponse] = await Promise.all([
        axios.put(
          `http://localhost:8080/api/admin/klinikpagi/ambilantrian/${id}?idUser=${idUser}`,
          {
            noAntrian: newAntrian,
            alamat: antrian.alamat,
            statusKlinik: antrian.statusKlinik,
            tanggalWaktu: antrian.tanggalWaktu,
            klinikId: antrian.klinikId,
          }
        ),
      ]);

      if (klinikPagiResponse.status === 200 && antrianResponse.status === 200) {
        userRequestTimestamps.set(idUser, new Date());

        setAntrian(klinikPagiResponse.data);
        setOpenAntrian(false);
        Swal.fire({
          title: "Sukses",
          text: "berhasil mengambil antrian",
          icon: "success",
        });
      } else {
        setOpenAntrian(true);
        Swal.fire({
          title: "Gagal",
          text: "gagal mengambil antrian",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      setOpenAntrian(true);
      Swal.fire({
        title: "Gagal",
        text: "gagal mengambil antrian",
        icon: "error",
      });
    }
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

  useEffect(() => {
    Aos.init();
    getDataAntrian();
  }, [id]);
  return (
    <>
      {loading && <IconLoader />}
      <Sidebar />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5">
          {antrian === null ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="bg-white w-12/12 h-44 rounded-xl">
                <div className="flex justify-around grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="flex justify-evenly">
                    <div className="h-36 w-32 my-4 mx-5 rounded-full">
                      <img
                        src={require("../../../asset/logo.png")}
                        alt="Logo"
                      />
                    </div>

                    <div className="block">
                      {Array.isArray(antrian) &&
                        antrian.map((item, index) => (
                          <div key={index}>
                            <div className="my-4 mx-1">
                              <h2 className="text-xl font-bold text-rose-700 md:text-3xl">
                                {item.namaKlinik}
                              </h2>
                            </div>
                            <hr />
                            <div className="block flex-col">
                              <div className="flex justify-start gap-2 my-2 mx-1">
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
                                <h2 className="text-gray-900 text-sm font-semibold">
                                  {item.alamat}
                                </h2>
                              </div>
                              <div className="flex justify-start gap-2 my-2 mx-1 lg:hidden">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                  className="w-3"
                                >
                                  <path
                                    fill="#e51515"
                                    d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"
                                  />
                                </svg>
                                <h2 className="text-sm font-semibold text-green-500 ">
                                  {item.noAntrian} Tersisa
                                </h2>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {!deviceMode && (
                    <div className="my-16 mx-24 flex justify-around">
                      <h2 className="text-2xl font-bold text-green-500 ">
                        {antrian.length > 0 &&
                          `${antrian[0].noAntrian} Tersisa`}
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              {openAntrian && (
                <>
                  <div className="float-end">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Ambil Antrian?",
                          text: `Apakah Anda yakin ingin mengambil antrian dengan nomor ${antrian.noAntrian}?`,
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonText: "Ya, Ambil Antrian",
                          cancelButtonText: "Batal",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            ambilTiket(antrian.klinikId);
                            setOpenAntrian(true);
                          }
                        });
                      }}
                      className="bg-rose-600 h-8 w-auto mx-2 my-3 rounded-lg text-white"
                    >
                      <span className="px-3">Ambil Antrian</span>
                    </button>
                  </div>
                </>
              )}

              {!openAntrian && (
                <>
                  <center>
                    <div
                      data-aos="zoom-in-down"
                      className="mt-5 bg-white w-8/12 h-44 rounded-xl"
                    >
                      <div className="flex justify-center pt-10">
                        <div className="text-center">
                          <p className="text-gray-900 text-xl font-semibold">
                            Nomer Antrian Anda
                          </p>
                          <hr />
                          <h2 className="text-2xl pt-3 font-bold text-green-500">
                            {antrian.noAntrian}
                          </h2>
                        </div>
                      </div>
                      <div className="float-end px-5 pt-4">
                        <button
                          onClick={() =>
                            handleNavigation(`/history-antrian-user`)
                          }
                          className="bg-sky-600 w-16 h-8 rounded-xl text-white"
                        >
                          History
                        </button>
                      </div>
                    </div>
                  </center>
                </>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
