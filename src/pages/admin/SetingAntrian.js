import React from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import { Input } from "@material-tailwind/react";

export default function SetingAntrian() {
  return (
    <>
      <SidebarAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className="bg-white rounded-lg w-full min-h-96">
            <form className="mt-5 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add">
              <p className="text-center text-3xl font-medium mb-7">
                Tambah Antrian
              </p   >

              <div className="relative mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Nama Guru"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempatlahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tempat Lahir"
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggallahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Tanggal Lahir"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    No Telepon
                  </label>
                  <input
                    type="text"
                    id="notelepon"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan No Telepon"
                  />
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Gelar Pendidikan
                  </label>
                  {/* <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="gelarPendidikan"
                    value={gelar_pendidikan}
                    onChange={(e) => setGelarPendidikan(e.target.value)}
                  >
                    <option value="" disabled>
                      Gelar Pendidikan
                    </option>
                    {gelar_option.map((val, i) => {
                      // Tambahkan kondisi untuk memeriksa status aktif atau non-aktif
                      if (val.status === "Aktif") {
                        return (
                          <option key={i} value={val.namaGelar}>
                            {val.namaGelar}
                          </option>
                        );
                      }
                      return null; // Tidak menambahkan opsi jika status non-aktif
                    })}
                  </select> */}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Status Kawin
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="statusKawin"
                    name="statusKawin"
                  >
                    <option value="" disabled>
                      Status Kawin
                    </option>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Agama
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="agama"
                    name="agama"
                  >
                    <option value="" disabled>
                      Agama
                    </option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katholik">Katholik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Khonghucu">Khonghucu</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 text-center">
                <label className="block mb-2 text-sm font-medium text-gray-900  text-left col-span-2">
                  Gender
                </label>
                <div className="relative mt-[-20px]">
                  <input
                    autoComplete="off"
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Laki-Laki"
                    id="Laki"
                  />

                  <label
                    htmlFor="Laki"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  >
                    <span> Laki-Laki </span>
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
                    value="Perempuan"
                    id="Perempuan"
                  />

                  <label
                    htmlFor="Perempuan"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  >
                    <span> Perempuan </span>
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

              <div className="flex justify-between">
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
