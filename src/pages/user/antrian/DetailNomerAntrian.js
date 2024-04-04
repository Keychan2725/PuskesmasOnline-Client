import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function DetailNomerAntrian() {
  const { id, idUser } = useParams();
  const [antrian, setAntrian] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  const DownloadFile = async () => {
    await Swal.fire({
      title: "Apakah Kamu Yakin",
      text: "Kamu ingin mengunduh history ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya , Unduh",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          // url:
          //   "http://localhost:8080/api/excel-guru/download-guru/" +
          //   localStorage.getItem("sekolahId"),
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "data-guru.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "Your file has been download.", "success");
      }
    });
  };

  const getNoAntrian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/antrian/getBy/${id}`
      );
      setAntrian(response.data);
      const { tanggalWaktu } = response.data;
      const [tanggalPart, jamPart] = tanggalWaktu.split(" ");
      setTanggal(tanggalPart);
      setJam(jamPart);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal Mengambil Data",
        text: "Error Responding ",
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
      {antrian && (
        <div className="flex justify-center w-[100%] mt-20">
          <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5 lg:pl-28">
            <h1 className="text-3xl text-gray-900 font-semibold pt-2 text-rose-700  ">
              Detail Nomer Antrian
            </h1>

            <div className="grid grid-cols-1 mt-5 w-auto gap-3">
              <div className="bg-white rounded-lg  ">
                <div className="justfy-items-center">
                  <div className=" h-36 w-32 my-4 mx-auto rounded-full flex justify-center">
                    <img src={require("../../../asset/logo.png")} alt="Logo" />
                  </div>
                  <span className="font-semibold text-xl mb- text-rose-700 lg:text-xl ">
                    Rs Purbalingga
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg grid grid-cols-1 gap-3 md:grid-cols-2 gap-5">
                <div className="mx-5 my-1">
                  <span className="font-semibold text-sm lg:text-sm">
                    Nama Klinik : {antrian.idKlinik}
                  </span>
                </div>
                <div className="mx-5 my-1">
                  <span className="font-semibold text-sm lg:text-sm">
                    No Antrian : {antrian.noAntrian}
                  </span>
                </div>
                <div className="mx-5 my-1">
                  <span className="font-semibold text-sm lg:text-sm">
                    Tanggal : {tanggal}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="bg-white w-full h-auto rounded-lg">
              <div className="flex justify-center w-full mt-5">
                <div className="flex justify-center w-full md:w-1/2 gap-5">
                  <div className="grid justify-items-stretch justify-self-stretch md:justify-self-center">
                    <div className="text-2xl text-green-500 font-bold ">
                      <span>{antrian.noAntrian}</span>
                    </div>
                    <div className="text-md font-semibold md:text-lg">
                      <span>Nama Klinik : {antrian.namaKlinik}</span>{" "}
                    </div>
                    <div className="text-md font-semibold md:text-lg">
                      <span>Alamat Klinik : {antrian.alamat}</span>{" "}
                    </div>
                    <div className="text-md font-semibold md:text-lg">
                      <span>Tanggal : {tanggal}</span>
                    </div>
                  </div>
                </div>
                <div className="float-end  pt-36 mx-5 lg:p">
                  <p className="text-sm text-gray-900">{jam}</p>
                </div>
              </div>
            </div> */}

            <div className="justify-center mx-2 mt-3 lg:float-end">
              <div className="flex justify-evenly gap-5">
                <button
                  className="bg-sky-600 text-white w-56  active:bg-slate-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => DownloadFile()}
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
