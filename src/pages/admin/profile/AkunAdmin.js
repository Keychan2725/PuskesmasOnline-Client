import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Modal } from "flowbite-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function AkunAdmin() {
  const [modalFoto, setModalFoto] = useState(false);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [openDataDiri, setOpenDataDiri] = useState(true);
  const [Keamanan, setKeamanan] = useState(false);
  const idUser = localStorage.getItem("userId");
  const id = localStorage.getItem("userId");
  const [dataDiri, setDataDiri] = useState("");
  const [dataAkun, setDataAkun] = useState("");
  const AuthToken = localStorage.getItem("token");

  const getDataDiri = async () => {
    try {
      const responseDataDiri = await axios.get(
        `http://localhost:8080/api/user/klinik/getDataDiriByIdUser/${idUser}`
      );
    } catch (error) {}
  };

  const getDataAkun = async () => {
    try {
      const token = await AuthToken;
      const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const dataUser = res.data;
      setDataAkun(dataUser.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data Akun Anda",
      });
    }
  };

  
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setPreviewFoto(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (crop) => {
    console.log(crop);
  };

  const onCloseModal = () => {
    setModalFoto(false);
    setPreviewFoto(null);
    setCrop({ aspect: 1 / 1 });
  };

  const onAccept = () => {
    onCloseModal();
  };

  if (modalFoto) {
    console.log("ubah profile");
  }

  useEffect(() => {
    getDataDiri();
    getDataAkun();
  });
  return (
    <>
      <SidebarAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5 lg:pl-28">
          <div className="bg-white rounded-lg shadow-md p-6 ">
            <div className="relative flex flex-col items-center mb-6">
              <button
                onClick={() => setModalFoto(true)}
                className="w-28 h-28 rounded-full border border-rose-600 overflow-hidden"
              >
                {previewFoto ? (
                  <img
                    src={previewFoto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={require("../../../asset/logo.png")}
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
              <h5 className="mt-2 txet-xs text-gray-500">
                Ketuk Untuk Mengubah Foto Profile
              </h5>
            </div>
            {/* button nav */}
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setOpenDataDiri(true);
                    setKeamanan(false);
                  }}
                  className={`px-3 py-2 text-sm font-medium focus:outline-none ${
                    openDataDiri
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  }`}
                  aria-current="page"
                >
                  Data Diri
                </button>
                <button
                  onClick={() => {
                    setOpenDataDiri(false);
                    setKeamanan(true);
                  }}
                  className={`px-3 py-2 text-sm font-medium focus:outline-none ${
                    Keamanan
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  }`}
                >
                  Keamanan
                </button>
                <a
                  href="#"
                  className="text-gray-900 hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Info
                </a>
              </div>
            </div>
            {/* isi dari nav */}
            {openDataDiri && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-4">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                </div>
              </>
            )}
            {Keamanan && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Username:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">No Telepon:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-4">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Password Lama:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Password Baru:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* modal upload foto */}
          <Modal dismissible show={modalFoto} onClose={onCloseModal}>
            <Modal.Header className="bg-rose-700">
              Ubah Foto Profile
            </Modal.Header>
            <Modal.Body className="bg-gray-300">
              <div className="space-y-6">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                  <input
                    className="md:float-start"
                    type="file"
                    onChange={onSelectFile}
                  />
                  {previewFoto && (
                    <div className="md:float-start md:mt-6">
                      <span>Preview Image : </span>
                      <ReactCrop
                        src={previewFoto}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={onCropComplete}
                        circularCrop
                      />
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-gray-300">
              <Button className="bg-rose-700" onClick={onAccept}>
                Ubah
              </Button>
              <Button className="bg-sky-500 text-white" onClick={onCloseModal}>
                Kembali
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    </>
  );
}
