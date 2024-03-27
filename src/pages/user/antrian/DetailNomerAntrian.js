import React, { useState } from "react";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

export default function DetailNomerAntrian() {
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
  return (
    <>
      <Sidebar />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5">
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
                <div className="text-2xl font-bold ">
                  <span>34</span>
                </div>
                <hr />
                <div className="text-md font-semibold md:text-lg">
                  <span>Pemimpin klinik : Chandra s.kedokteran</span>
                </div>
                <hr />
                <div className="text-md font-semibold md:text-lg">
                  <span>Nama Klinik : Rs Purbalingga</span>
                </div>
                <hr />
                <div className="text-md font-semibold md:text-lg">
                  <span>Alamat Klinik : Purbalingga , Jawa tengah</span>
                </div>
                <hr />
                <div className="text-md font-semibold md:text-lg">
                  <span>Tanggal : 27 Maret 2023</span>
                </div>
                <hr />
              </div> 
            </div>
            <div className="float-end">
              <p className="text-sm text-gray-900">08.36</p>
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
    </>
  );
}
