import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/Sidebar";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import toast from "react-hot-toast";
import Aos from "aos";
import IconLoader from "../../../component/Loader";
export default function AmbilAntrian() {
  const deviceMode = useMediaQuery({ query: "(max-width: 767px)" });
  const dekstopMode = useMediaQuery({ query: "(min-width: 768px)" });
  const [openAntrian, setOpenAntrian] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const getDataUser = async () => {
    try {
      const response = await axios.get(``);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menambil Data User");
    }
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
  }, []);
  return (
    <>
      {loading && <IconLoader />}
      <Sidebar />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5">
          <div className="bg-white w-12/12 h-44  rounded-xl">
            <div className="flex justify-around grid grid-cols-1 gap-2 md:grid-cols-2  ">
              <div className="flex justify-evenly">
                <div className="h-36 w-32 my-4 mx-5  rounded-full ">
                  <img src={require("../../../asset/logo.png")} alt="Logo" />
                </div>
                <div className="block">
                  <div className="my-4 mx-1 ">
                    <h2 className="text-xl font-bold text-rose-700 md:text-3xl">
                      Rs Purbalingga
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
                      <h2 className="text-gray-900 text-xs font-semibold">
                        Purbalingga , Jawa Tengah
                      </h2>
                    </div>
                    <div className="my-2 mx-1">
                      <h2 className="text-xs font-semibold text-gray-900"></h2>
                    </div>
                    <div className="flex justify-start gap-2 my-2 mx-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3"
                        viewBox="0 0 512 512"
                      >
                        {" "}
                        <path
                          fill="#e51515"
                          d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z"
                        />
                      </svg>
                      <h2 className="text-gray-900 text-xs font-semibold">
                        Negeri
                      </h2>
                    </div>
                    <div className="flex justify-start gap-2 my-2 mx-1 md:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="w-3"
                      >
                        {" "}
                        <path
                          fill="#e51515"
                          d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"
                        />
                      </svg>
                      <h2 className="text-xs font-bold text-green-500 ">
                        33 Tersisa
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {!deviceMode && (
                <div className="my-16 mx-24 flex justify-around ">
                  <h2 className="text-2xl font-bold text-green-500 ">
                    33 Tersisa
                  </h2>
                </div>
              )}
            </div>
          </div>
          {openAntrian && (
            <>
              <center>
                <div
                  data-aos="zoom-in-down"
                  className=" mt-5 bg-white w-8/12 h-44  rounded-xl "
                >
                  <div className="flex justify-center pt-10 ">
                    <div className="text-center">
                      <p className="text-gray-900 text-xl font-semibold">
                        Nomer Antrian Anda
                      </p>
                      <hr />
                      <h2 className="text-2xl pt-3 font-bold text-green-500 ">
                        34
                      </h2>
                    </div>
                  </div>
                  <div className="float-end px-5 pt-4 ">
                    <button
                      onClick={() =>
                        handleNavigation("/detail-nomer-antrian/:idAntrian")
                      }
                      className="bg-sky-600 w-16 h-8 rounded-xl text-white"
                      href=""
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </center>
            </>
          )}
          {!openAntrian && (
            <>
              <div className="float-end  ">
                <button
                  onClick={() => setOpenAntrian(true)}
                  className="bg-rose-600 h-8 w-auto mx-2 my-3 rounded-lg text-white "
                >
                  <span className="px-3">Ambil Antrian</span>
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
