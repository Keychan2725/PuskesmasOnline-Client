import React, { useEffect, useRef, useState } from "react";
import SidebarSuperAdmin from "../../component/SidebarSuperAdmin";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function DaftarKlinik() {
  const [klinikAdmin, setKlinikAdmin] = useState([]);
  const [modal, setModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const form = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const getAll = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/all`);
      setKlinikAdmin(response.data.data);
      console.log(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Terima = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/user/terima-klinik/${id}`, {
        status: "Diterima",
      });
      Swal.fire({
        icon: "success",
        title: "Menerima Klinik",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };
  const Batal = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/user/batal-klinik/${id}`, {});
      Swal.fire({
        icon: "success",
        title: "Batal menerima Klinik",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const Tolak = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/user/tolak-klinik/${id}`, {
        status: null,
      });
      Swal.fire({
        icon: "success",
        title: "Tolak Klinik",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "Kesalahan",
      });
    }
  };

  const deleteUser = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data Klinik ini? Pastikan sudah memberikan pemberitahuan melalui email",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/user/${id}`);
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menghapus!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan saat menghapus data",
          });
        }
      }
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ztyk8vk",
        "template_aveu3d7",
        form.current,
        "-Bw1Ibwk-iGxtih6p"
      )
      .then(
        (result) => {
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        (error) => {
          if (error) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Gagal Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
  };

  const cariklinikAdmin = (term) => {
    if (term.trim() === "") {
      setFilteredUsers([...klinikAdmin]);
    } else {
      const filteredResults = klinikAdmin.filter(
        (user) =>
          user.username &&
          user.username.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filteredResults);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getAll();
  }, []);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = Array.isArray(filteredUsers)
    ? filteredUsers.slice(offset, offset + itemsPerPage)
    : [];

  // style css internal
  <style jsx>{`
    .pagination-item {
      @apply relative;
      @apply inline-block;

      &.active {
        @apply font-bold text-red-400; /* Mengatur warna merah pada halaman aktif */
      }

      &.active::after {
        @apply absolute w-full h-1 bg-red-400 bottom-0 left-0; /* Membuat garis merah di bawah halaman aktif */
        content: "";
      }
    }

    .pagination-previous,
    .pagination-next {
      @apply inline-block;
      @apply text-center;
    }
  `}</style>;

  return (
    <>
      <SidebarSuperAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className=" h-full max-w-full bg-white rounded-lg ">
            <div className="grid flex justify-between md:grid-cols-1  overflow-hidden     ">
              <div className="flex  justify-end my-5 md:">
                <button
                  onClick={() => setModal(true)}
                  className="text-white  bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 text-xs ease-linear transition-all duration-150 md:text-left"
                >
                  Kirim Pemberitahuan
                </button>
                <label className="flex   me-11">
                  <input
                    type="text"
                    className="text-dark rounded-lg mx-2   active:bg-slate-300   text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                    placeholder="Cari nama Klinik"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      cariklinikAdmin(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="  overflow-x-auto rounded-lg border border-gray-200 p-5">
              <table
                className="min-w-full divide-gray-200 text-center p-5"
                id="example"
              >
                <thead className="th-add">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      No
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Email
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Username
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="12"
                        className="text-center py-4 whitespace-nowrap text-gray-500"
                      >
                        <div className="flex flex-col   items-center">
                          <img
                            src={require("../../asset/logo.png")}
                            className="w-36 h-32 text-gray-400 mb-3"
                            alt=""
                          />
                          <p className="text-sm">klinik tidak ditemukan.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((val, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="border-blue-300 left-0 py-2">
                            {offset + idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                            {val.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left  ">
                            {val.username}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                            {val.status}
                          </td>
                          <td className="whitespace-nowrap text-ceter py-2">
                            {val.status === "Diterima" ? (
                              <>
                                <div className="float-start">
                                  {" "}
                                  <button
                                    className="text-white bg-purple-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => Batal(val.id)}
                                  >
                                    Batal
                                  </button>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </>
                            ) : val.status === "Ditolak" ? (
                              <>
                                <div className="float-start">
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => deleteUser(val.id)}
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="float-start">
                                  {" "}
                                  <button
                                    className="text-white bg-green-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => Terima(val.id)}
                                  >
                                    Terima
                                  </button>
                                  <button
                                    className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                    onClick={() => Tolak(val.id)}
                                  >
                                    Tolak
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              className={`flex justify-center gap-3 text-center mb-5 `}
              previousLabel={
                <button
                  className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                  aria-label="Previous"
                >
                  Previous
                </button>
              }
              nextLabel={
                <button
                  className="text-white bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                  aria-label="Next"
                >
                  Next
                </button>
              }
              breakLabel={<span className="pagination-ellipsis">...</span>}
              pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"text-red-400 font-bold"}
              pageClassName={"pagination-item"}
              pageLinkClassName={"pagination-link"}
              previousClassName={"pagination-previous"}
              nextClassName={"pagination-next"}
            />
          </div>
          {modal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Kirim Pemberitahuan
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 opacity-20 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setModal(false)}
                      >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative flex-auto">
                      <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="space-y-4 p-3"
                      >
                        <div>
                          <div className="grid   grid-cols-1 gap-6">
                            <div>
                              <label className="float-start my-2">Email </label>
                              <input
                                type="email"
                                name="email_user"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Masukan Email User "
                                required
                              />
                            </div>

                            <div>
                              <label className="float-start my-2">
                                Isi Pesan
                              </label>
                              <textarea
                               
                                name="message"
                                placeholder="Masukan Pesan"
                                rows={4}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-white bg-red-700 font-bold uppercase px-6 py-3.5 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setModal(false)}
                          >
                            Batal
                          </button>
                          <button
                            className="bg-gradient-to-r from-[#0b409c] to-[#10316b] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Kirim
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </>
  );
}
