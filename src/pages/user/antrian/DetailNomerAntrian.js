import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function DetailNomerAntrian() {
  const { id } = useParams();
  const [antrian, setAntrian] = useState("");
  const [tanggal, setTanggal] = useState(""); // State for date
  const [jam, setJam] = useState("");
  const DonwloadFile = async () => {
    try {
      const { value: shouldDownload } = await Swal.fire({
        title: "Download file?",
        text: "Are you sure you want to download the file?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Download",
        cancelButtonText: "Cancel",
      });

      if (shouldDownload) {
        // Download the file
        await axios.post(`<your_api_url>`).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "File downloaded successfully.",
          });
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while trying to download the file.",
      });
    }
  };

  const getNoAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/klinikpagi/get/${id}`
      );
      setAntrian(response.data);
      const { tanggalWaktu } = response.data;
      const [tanggalPart, jamPart] = tanggalWaktu.split(" ");
      setTanggal(tanggalPart);
      setJam(jamPart);
    } catch (error) {
      Swal.fire({
        title: "Gagal Mengambil Data",
        text: "Error Responding " + error,
        icon: "error",
      });
    }
  };
  const getAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/antrian/klinikpagi/get/${id}`
      );
      setAntrian(response.data);
      const { tanggalWaktu } = response.data;
      const [tanggalPart, jamPart] = tanggalWaktu.split(" ");
      setTanggal(tanggalPart);
      setJam(jamPart);
    } catch (error) {
      Swal.fire({
        title: "Gagal Mengambil Data",
        text: "Error Responding " + error,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    getNoAntrian();
  });
  return (
    <>
      <Sidebar />
      {antrian && ( // Render only when antrian is not null
        <div className="flex justify-center w-[100%] mt-20">
          <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="bg-white w-full h-80 rounded-lg">
              <h1 className="text-3xl text-gray-900 font-semibold pt-2 text-rose-700">
                Detail Nomer Antrian
              </h1>
              <hr className="mt-3 placeholder-orange-800" />
              <div className="flex justify-evenly grid grid-cols-1 md:grid-cols-2 gap-1 mt-5">
                <div className="h-36 w-32 my-4 mx-5  rounded-full justify-self-center">
                  <img src={require("../../../asset/logo.png")} alt="Logo" />
                </div>
                <div className="grid justify-items-stretch justify-self-stretch md:justify-self-center">
                  <div className="text-2xl text-green-500 font-bold ">
                    <span>{antrian.noAntrian}</span> {/* Render number */}
                  </div>
                  <hr />
                  <div className="text-md font-semibold md:text-lg">
                    <span>Nama Klinik : {antrian.namaKlinik}</span>{" "}
                    {/* Render clinic name */}
                  </div>
                  <hr />
                  <div className="text-md font-semibold md:text-lg">
                    <span>Alamat Klinik : {antrian.alamat}</span>{" "}
                    {/* Render clinic address */}
                  </div>
                  <hr />
                  <div className="text-md font-semibold md:text-lg">
                    <span>Tanggal : {tanggal}</span> {/* Render date */}
                  </div>
                  <hr />
                </div>
              </div>
              <div className="float-end pt-10 mx-5">
                <p className="text-sm text-gray-900">{jam}</p>
              </div>
            </div>
            <div className="float-end mx-2 mt-3">
              <div className="flex justify-evenly gap-5">
                <button
                  className="bg-sky-600 text-white w-56   active:bg-slate-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => DonwloadFile()}
                >
                  Download File
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
