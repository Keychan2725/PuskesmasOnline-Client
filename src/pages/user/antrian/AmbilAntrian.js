import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import toast from "react-hot-toast";
import Aos from "aos";
import IconLoader from "../../../component/Loader";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
export default function AmbilAntrian() {
  const deviceMode = useMediaQuery({ query: "(max-width: 767px)" });
  const dekstopMode = useMediaQuery({ query: "(min-width: 768px)" });
  const [openAntrian, setOpenAntrian] = useState(true);
  const [loading, setLoading] = useState(false);
  const [antrian, setAntrian] = useState([]);
  const [namaKlinik, setNamaklinik] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noAntrian, setNoAntrian] = useState("");
  const [status, setStatus] = useState("");
  const [statusKlinik, setStatusKlinik] = useState("");
  const [tanggalWaktu, setTanggalWaktu] = useState("");
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [userRequestTimestamps, setUserRequestTimestamps] = useState(new Map());
  const [lastRequestError, setLastRequestError] = useState(false);
  const [userRequestCounts, setUserRequestCounts] = React.useState(new Map());

  const getDataAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/klinikpagi/get/${id}`
      );
      setAntrian(response.data);
      setNamaklinik(response.data.namaKlinik);
      setAlamat(response.data.alamat);
      setNoAntrian(response.data.noAntrian);
      setStatus(response.data.status);
      setStatusKlinik(response.data.statusKlinik);
      setTanggalWaktu(response.data.tanggalWaktu);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Mengambil Data User");
    }
  };
  var tanggalBulan = tanggalWaktu.split("-");
  const tahun = tanggalBulan[0];
  const bulan = tanggalBulan[1];

  const validateTicketRequest = (idUser) => {
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);
    const lastRequestTime = userRequestTimestamps.get(`${idUser}`);
    const lastRequestCount = userRequestCounts.get(`${idUser}`);

    if (
      lastRequestTime &&
      lastRequestTime > fourHoursAgo &&
      lastRequestCount >= 1
    ) {
      setLastRequestError(true);
      return false;
    }

    setLastRequestError(false);
    return true;
  };

  const ambilTiket = async () => {
    try {
      const newAntrian = parseInt(antrian.noAntrian) - 1;
      const idUser = localStorage.getItem("userId");

      if (!validateTicketRequest(idUser)) {
        toast.error("Anda sudah mengambil antrian selama 4 jam terakhir");
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
            namaKlinik: antrian.namaKlinik,
          }
        ),
      ]);

      setAntrian(klinikPagiResponse.data);
      setOpenAntrian(false);
      Swal.fire({
        title: "Sukses",
        text: "berhasil mengambil antrian",
        icon: "success",
      });

      saveLastRequestTime(idUser);
    } catch (error) {
      setOpenAntrian(true);
      Swal.fire({
        title: "Gagal",
        text: "gagal mengambil antrian",
        icon: "error",
      });
    }
  };

  const saveLastRequestTime = (idUser) => {
    setUserRequestTimestamps(
      userRequestTimestamps.set(`${idUser}`, new Date())
    );
    setUserRequestCounts(
      userRequestCounts.set(
        `${idUser}`,
        (userRequestCounts.get(`${idUser}`) || 0) + 1
      )
    );
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
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
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
                      <div className="my-4 mx-1">
                        <h2 className="text-xl font-bold text-rose-700 md:text-3xl">
                          {namaKlinik}
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
                          <h2 className="text-gray-900 text-xs font-semibold lg:text-sm">
                            {alamat}
                          </h2>
                        </div>
                        <div className="flex justify-start gap-2 my-2 mx-1">
                          <svg
                            className="w-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#e51515"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <h2 className="text-gray-900 text-xs font-semibold lg:text-sm">
                            {statusKlinik}
                          </h2>
                        </div>
                        <div className="flex justify-start gap-2 my-2 mx-1 ">
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
                            {noAntrian} Tersisa
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="items-center">{ bulan, tahun}</div> */}
                </div>
              </div>
              {openAntrian && (
                <>
                  <div className="float-end ">
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
