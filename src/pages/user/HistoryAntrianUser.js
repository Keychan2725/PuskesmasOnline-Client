import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import ReactPaginate from "react-paginate";
import "./History.css";

export default function HistoryAntrianUser() {
  const idUser = localStorage.getItem("userId");
  const [history, setHistory] = useState([]);
  const [klinikPagiList, setKlinikPagiList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const getHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/antrian/all/${idUser}`
      );
      setHistory(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Anda Belum Memiliki History Antrian ",
        icon: "warning",
      });
    }
  };

  const Delete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Anda yakin ingin menghapus data ini?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8080/api/antrian/delete/${id}`
        );
        Swal.fire("Data Terhapus!", "Data berhasil dihapus.", "success");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus data.", "error");
    }
  };

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

  // const getNameKlinikPagi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/admin/klinikpagi/get/${id}`
  //     );
  //     setKlinikPagiList(response.data.namaKlinik);//   } catch (error) {
  //     console.log("Gagal Ambil Data Klinik Pagi");
  //   }
  // };

  useEffect(() => {
    getHistory();
    // getNameKlinikPagi();
  }, []);

  const filteredHistory =
    searchQuery.length > 0
      ? history.filter((val) =>
          val.idKlinik.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : history;

  const itemsPerPage = 5;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Sidebar />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className="p-5 bg-white">
            <div className="flex justify-center">
              <h1 className="text-xl font-semibold text-rose-600">
                History Antrian
              </h1>
            </div>
            <div className="grid justify-center md:justify-end">
              <div className="grid grid-cols-1 md:flex gap-3 mt-6 justify-end">
                {history.length === 0 ? (
                  <></>
                ) : (
                  <button
                    className="text-center bg-rose-500 text-white w-auto active:bg-gray-200 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => DownloadFile()}
                  >
                    Download Data
                  </button>
                )}
                <div className="w-75  flex-row items-center relative">
                  <div className="mr-4 flex-grow">
                    <input
                      id="searchKlinik"
                      type="text"
                      className="bg-gray-100 border   border-gray-200 text-gray-950 text-sm rounded-lg   block w-full p-2.5   "
                      placeholder="Cari History "
                      onChange={setSearchQuery}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mt-5">
              <table
                className="min-w-full divide-gray-200 text-center p-5"
                id="example"
                data-aos="zoom-in"
              >
                <thead className="th-add">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      No
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      No Antrian
                    </th>

                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Nama Klinik
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Tanggal
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredHistory &&
                    filteredHistory
                      .slice(
                        currentPage * itemsPerPage,
                        (currentPage + 1) * itemsPerPage
                      )
                      .map((val, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="border-blue-300 left-0 py-2">
                              {idx + 1 + currentPage * itemsPerPage}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.noAntrian}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.namaKlinik}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.status}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.tanggalWaktu}
                            </td>
                            <td className="whitespace-nowrap text-ceter py-2">
                              <div className="flex items-center -space-x-4 hover:space-x-1">
                                <Link to={"/detail-nomer-antrian/" + val.id}>
                                  <button
                                    className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2 12s3 7.5 10 7.5 10-7.5 10-7.5-3-7.5-10-7.5S2 12 2 12z"
                                      />
                                    </svg>
                                  </button>
                                </Link>
                                <button
                                  className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                                  type="button"
                                  onClick={() => Delete(val.id)}
                                >
                                  <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-evenly mt-3">
              <div className="pagination">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={Math.ceil(filteredHistory.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  breakLabel={<a className="pagination__link label">...</a>}
                  pageLinkClassName={"pagination__link"}
                  pageClassName={"pagination__item"}
                  forcePage={currentPage}
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
