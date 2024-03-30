import React, { useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function SetingAntrian() {
  const [noAntrian, setJumlahNoAntrian] = useState("");
  const userId = parseInt(localStorage.getItem("userId"));
  const [namaKlinik, setNamaKlinik] = useState("");
  const [statusKlinik, setStatusKlinik] = useState("");
  const [alamat, setAlamat] = useState("");
  const TambahAntrian = async (e) => {
    e.preventDefault();
    const Antrian = {
      noAntrian: noAntrian,
      klinikId: userId,
      statusKlinik: statusKlinik,
      status: "Buka",
      namaKlinik: namaKlinik,
      alamat: alamat,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/klinikpagi/create",
        Antrian
      );

      toast.success("Berhasil Menambahkan Antrian");
      setTimeout(() => {
        window.location.href = "/history-antrian";
      }, 1500);
    } catch (error) {
      Swal.fire({
        title: "Tidak Bisa melakukan aksi",
        icon: "error",
        text: "Terjadi Kesalahan Di " + error,
      });
      console.error("Terjadi kesalahan:", error);
    }
  };
  return (
    <>
      <SidebarAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className="bg-white rounded-lg w-full min-h-96">
            <form
              className="mt-5 mb-0 space-y-4 rounded-lg p-8 "
              onSubmit={TambahAntrian}
            >
              <p className="text-center text-3xl font-medium mb-7">
                Tambah Antrian
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Jumlah Antrian
                  </label>
                  <input
                    type="number"
                    id="jumlahantrian"
                    onChange={(e) => setJumlahNoAntrian(e.target.value)}
                    value={noAntrian}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Jumlah Antrian "
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Nama Klinik
                  </label>
                  <input
                    type="text"
                    id="namaKlinik"
                    onChange={(e) => setNamaKlinik(e.target.value)}
                    value={namaKlinik}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Nama Klinik"
                  />
                </div>
              </div>
              <div className="relative mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Alamat Klinik"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-5 text-center">
                <label className="block mb-2 text-sm font-medium text-gray-900  text-left col-span-2">
                  Status
                </label>
                <div className="relative mt-[-20px]">
                  <input
                    autoComplete="off"
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Negeri"
                    onChange={(e) => setStatusKlinik(e.target.value)}
                    id="Negeri"
                  />

                  <label
                    htmlFor="Negeri"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  >
                    <span> Negeri </span>
                  </label>

                  <svg
                    className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="relative mt-[-20px]">
                  <input
                    autoComplete="off"
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Swasta"
                    onChange={(e) => setStatusKlinik(e.target.value)}
                    id="Swasta"
                  />

                  <label
                    htmlFor="Swasta"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  >
                    <span> Swasta </span>
                  </label>

                  <svg
                    className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <button
                  type="button"
                  className="block w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="block w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
