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
  const [openAntrian, setOpenAntrian] = useState(false);
  const [loading, setLoading] = useState(false);
  const [antrian, setAntrian] = useState("");
  const { id } = useParams();
  console.log(id);
  const getDataAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/klinikpagi/${id}`
      );
      setAntrian(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Mengambil Data User");
    }
  };
  console.log(antrian);
  const ambilTiket = async () => {
    try {
      const newAntrian = antrian.noAntrian - 1;

      const response = await axios.put(
        `http://localhost:8080/api/admin/klinikpagi/${id}`,
        {
          ...antrian,
          noAntrian: newAntrian,
        }
      );
      // Jika permintaan berhasil, perbarui nilai antrian di state
      setAntrian(response.data);
      toast.success("Antrian berhasil diambil");
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil antrian");
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
          <div className="bg-white w-12/12 h-44  rounded-xl">
            <div className="flex justify-around grid grid-cols-1 gap-2 md:grid-cols-2  ">
              <div className="flex justify-evenly">
                <div className="h-36 w-32 my-4 mx-5  rounded-full ">
                  <img src={require("../../../asset/logo.png")} alt="Logo" />
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
                            <h2 className="text-gray-900 text-xs font-semibold">
                              {item.alamat}
                            </h2>
                          </div>
                          <div className="my-2 mx-1">
                            <h2 className="text-xs font-semibold text-gray-900">
                              Sisa Nomor Antrian: {item.noAntrian} Tersisa
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {!deviceMode && (
                <div className="my-16 mx-24 flex justify-around ">
                  <h2 className="text-2xl font-bold text-green-500 ">
                    33 Tersisa
                  </h2>
                </div>
              )}
            </div>
          </div>
          {!openAntrian && (
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
                        ambilTiket(antrian.id);
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

          {openAntrian && (
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
                        handleNavigation(`/detail-nomer-antrian/${antrian.id}`)
                      }
                      className="bg-sky-600 w-16 h-8 rounded-xl text-white"
                      href=""
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </center>
            </>
          )}
        </section>
      </div>
    </>
  );
}
