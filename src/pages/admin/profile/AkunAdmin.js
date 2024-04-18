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
  const [kontak, setKontak] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  const [ubahDataDiriPage, setUbahDataDiriPage] = useState(false);
  const idUser = localStorage.getItem("userId");
  const id = localStorage.getItem("userId");
  const [namaDepan, setNamaDepan] = useState("");
  const [gender, setGender] = useState("");
  const [usia, setUsia] = useState("");
  const [nik, setNik] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTel, setNoTel] = useState("");
  const [username, setUsername] = useState("");
  const AuthToken = localStorage.getItem("token");
  const [ubahDataKontak, setUbahDatakontak] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const getDataDiri = async () => {
    try {
      const responseDataDiri = await axios.get(
        `http://localhost:8080/api/user/klinik/getDataDiriByIdUser/${idUser}`
      );
      setNamaDepan(responseDataDiri.data.namaDepan);
      setNamaBelakang(responseDataDiri.data.namaBelakang);
      setUsia(responseDataDiri.data.usia);
      setNik(responseDataDiri.data.nik);
      setGender(responseDataDiri.data.gender);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Tidak Bisa Mengambil Data", "error");
    }
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
      setEmail(res.data.data.email);
      setPassword(res.data.data.password);
      setUsername(res.data.data.username);
      setNoTel(res.data.data.noTel);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data Akun Anda",
      });
    }
  };
  // Aksi Ubah data Akun
  const UbahDataAkunCrud = async () => {
    try {
      const dataAkun = {
        email: email,
        username: username,
        noTel: noTel,
      };
      const token = await AuthToken;
      const res = await axios.get(
        `http://localhost:8080/api/user/${id}`,
        dataAkun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      Swal.fire("Berhasil", "Berhasil Mengubah Data Akun Anda", "success");
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", " Gagal Mengupdate Data");
    }
  };
  // Oncahnge Data Akun
  const EmailChange = (event) => {
    setEmail(event.target.value);
  };
  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const NoTelChange = (event) => {
    setNoTel(event.target.value);
  };

  // Aksi Ubah data diri
  const UbahDataDiriCrud = async () => {
    try {
      await Swal.fire({
        title: "Apakah Kamu Yakin",
        text: "Kamu ingin mengubah data diri anda ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya , Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          const dataUbah = {
            namaDepan: namaDepan,
            namaBelakang: namaBelakang,
            gender: gender,
            nik: nik,
            usia: usia,
            idUser: idUser,
          };
          axios.put(
            `http://localhost:8080/api/user/klinik/dataDiri/update/${idUser}`,
            dataUbah
          );
          Swal.fire("Berhasil", "Berhasil Mengubah Data", "success");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", "Gagal Update Data", "error");
    }
  };

  // Aksi Ubah Password
  const UpdatePassword = async () => {
    try {
      if (oldPassword && newPassword) {
        await Swal.fire({
          title: "Apakah Kamu Yakin",
          text: "Kamu ingin mengubah Password anda ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya , Ubah",
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (oldPassword !== newPassword) {
              const verifyResponse = await axios.post(
                `http://localhost:8080/api/user/${id}/verify-password`,
                {
                  password: oldPassword,
                }
              );
              if (verifyResponse.data.success) {
                const response = await axios.put(
                  `http://localhost:8080/api/user/${id}/change-password`,
                  {
                    password: oldPassword,
                    newPassword: newPassword,
                  }
                );

                console.log(response.data);
                Swal.fire("Berhasil", "Berhasil Mengubah Password", "success");
                window.location.reload();
              } else {
                Swal.fire("Gagal", "Password lama tidak sesuai", "error");
              }
            } else {
              Swal.fire(
                "Gagal",
                "Password lama tidak boleh sama dengan password baru",
                "error"
              );
            }
          }
        });
      } else {
        Swal.fire("Gagal", "Password Tidak Boleh Kosong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal Update Data", "error");
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

  // Onchange Variabel ubah data diri
  const NamaDepanChange = (event) => {
    setNamaDepan(event.target.value);
  };
  const NamaBelakangChange = (event) => {
    setNamaBelakang(event.target.value);
  };
  const UsiaChange = (event) => {
    setUsia(event.target.value);
  };
  const NikChange = (event) => {
    setNik(event.target.value);
  };
  const GenderChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    getDataDiri();
    getDataAkun();
  }, []); // Gunakan array kosong agar useEffect hanya dijalankan sekali

  return (
    <>
      <SidebarAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5 lg:pl-28">
          <div className="bg-white h-full  rounded-lg shadow-md p-6 ">
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
                    setKontak(false);
                    setUbahDatakontak(false);
                    setUbahDataDiriPage(false);
                    setUpdatePass(false);
                  }}
                  className={`px-3 py-2 text-sm font-medium focus:outline-none ${
                    openDataDiri
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  }
                  ${
                    ubahDataDiriPage
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
                    setUbahDataDiriPage(false);
                    setUbahDatakontak(false);
                    setUpdatePass(false);
                    setKontak(true);
                  }}
                  className={`px-3 py-2 text-sm font-medium focus:outline-none ${
                    kontak
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  } ${
                    ubahDataKontak
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  }`}
                >
                  Info Kontak
                </button>
                <button
                  onClick={() => {
                    setOpenDataDiri(false);
                    setUbahDataDiriPage(false);
                    setUbahDatakontak(false);
                    setKontak(false);
                    setUpdatePass(true);
                  }}
                  className={`px-3 py-2 text-sm font-medium focus:outline-none ${
                    updatePass
                      ? "border-b-2 border-red-600 text-rose-600"
                      : "text-gray-900 hover:bg-rose-700 hover:text-white"
                  }`}
                >
                  Password
                </button>
              </div>
            </div>
            {/* isi dari nav */}
            {openDataDiri && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama Depan:</p>
                    <p className="font-semibold">{namaDepan}</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Nama Belakang:</p>
                    <p className="font-semibold">{namaBelakang}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Gender :</p>
                    <p className="font-semibold">{gender}</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Usia :</p>
                    <p className="font-semibold">{usia}</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">NIK :</p>
                    <p className="font-semibold">{nik}</p>
                  </div>
                </div>
                <div className=" mx-4 my-4 float-end">
                  <button
                    onClick={() => {
                      setUbahDataDiriPage(true);
                      setOpenDataDiri(false);
                    }}
                    className="text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    <span className="px-3 my-5">Ubah Data Diri</span>
                  </button>
                </div>
              </>
            )}

            {/* Aksi Ubah Data */}
            {ubahDataDiriPage && (
              <>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-600">Nama Depan:</p>
                      <input
                        type="text"
                        required
                        value={namaDepan}
                        onChange={(e) => NamaDepanChange(e)}
                        className="font-semibold my-4 mx-5 space-4 "
                      />
                    </div>
                    <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-600">Nama Belakang:</p>
                      <input
                        className="font-semibold my-4 mx-5 space-4 "
                        onChange={(e) => NamaBelakangChange(e)}
                        type="text"
                        required
                        value={namaBelakang}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
                    <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-600">Gender :</p>
                      <input
                        type="text"
                        required
                        value={gender}
                        onChange={(e) => GenderChange(e)}
                        className="font-semibold my-4 mx-5 space-4 "
                      />
                    </div>
                    <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-600">Usia :</p>
                      <input
                        type="text"
                        required
                        value={usia}
                        onChange={(e) => UsiaChange(e)}
                        className="font-semibold my-4 mx-5 space-4 "
                      />
                    </div>
                    <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-600">NIK :</p>
                      <input
                        type="text"
                        required
                        value={nik}
                        onChange={(e) => NikChange(e)}
                        className="font-semibold my-4 mx-5 space-4 "
                      />
                    </div>
                  </div>
                  <div className="flex justify-evenly gap-2 mx-4 my-4 float-end">
                    <button
                      onClick={() => {
                        setOpenDataDiri(true);
                        setUbahDataDiriPage(false);
                      }}
                      className="text-center bg-sky-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      <span className="px-3 my-5">Kembali</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => UbahDataDiriCrud()}
                      className="text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      <span className="px-3 my-5">Ubah Data Diri</span>
                    </button>
                  </div>
                </form>
              </>
            )}

            {/*  */}
            {/*  info Kontak */}
            {kontak && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Username :</p>
                    <p className="font-semibold">{username}</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">Email :</p>
                    <p className="font-semibold">{email}</p>
                  </div>
                  <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">No Telepon :</p>
                    <p className="font-semibold">{noTel}</p>
                  </div>
                </div>
                <div className="mx-4 my-4 float-end">
                  <button
                    onClick={() => {
                      setUbahDatakontak(true);
                      setKontak(false);
                    }}
                    className="text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    <span className="px-3 my-5">Ubah Kontak</span>
                  </button>
                </div>
              </>
            )}
            {/* Aksi Ubah Data kontak */}
            {ubahDataKontak && (
              <>
                <>
                  <form onSubmit={UbahDataAkunCrud}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                      <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">Username :</p>
                        <input
                          className="font-semibold my-4 mx-5 space-4 "
                          onChange={(e) => UsernameChange(e)}
                          type="text"
                          required
                          value={username}
                        />
                      </div>
                      <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">Email :</p>
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => EmailChange(e)}
                          className="font-semibold my-4 mx-5 space-4 "
                        />
                      </div>
                      <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">No Telepon :</p>
                        <input
                          className="font-semibold my-4 mx-5 space-4 "
                          onChange={(e) => NoTelChange(e)}
                          type="text"
                          required
                          value={noTel}
                        />
                      </div>
                    </div>
                    <div className="flex justify-evenly gap-2 mx-4 my-4 float-end">
                      <button
                        onClick={() => {
                          setUbahDatakontak(false);
                          setKontak(true);
                        }}
                        className=" text-center bg-sky-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <span className="px-3 my-5">Kembali</span>
                      </button>
                      <button
                        type="submit"
                        className=" text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <span className="px-3 my-5">Ubah Kontak</span>
                      </button>
                    </div>
                  </form>
                </>
              </>
            )}
            {/* Aksi Ubah Ganti Password */}
            {updatePass && (
              <>
                <>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                      <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">Password Lama :</p>
                        <input
                          type="password"
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="font-semibold my-4 mx-5 space-4"
                        />
                      </div>
                      <div className="border border-rose-600 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600">Password Baru :</p>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="font-semibold my-4 mx-5 space-4"
                        />
                      </div>
                    </div>
                    <div className="flex justify-evenly gap-2 mx-5 my-5 float-end">
                      <button
                        type="button"
                        onClick={() => UpdatePassword()}
                        className="text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <span className="px-3 my-5">Ubah Password</span>
                      </button>
                    </div>
                  </form>
                </>
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
