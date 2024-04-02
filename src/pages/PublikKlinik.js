import React from "react";
import Logo from "../asset/logo.png";
export default function PublikKlinik() {
  return (
    <>
      <header>
        <nav className={`sticky top-0 w-full h-16 z-10 bg-rose-500`}>
          <div className="flex items-center justify-between flex-grow">
            <div className="flex items-center">
              <img
                src={Logo}
                className="mx-34 h-16 sm:h-18"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                PUSLINE
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <a
                  href="/login"
                  className="text-white focus:ring-4 focus:ring-gray-300 focus:hover:bg-rose-300  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-rose-300 focus:outline-none dark:focus:ring-gray-300"
                >
                  Masuk
                </a>
                <a
                  href="/register-user"
                  className="text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-900 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-500"
                >
                  Registrasi
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section className="mt-10  mx-10 ">
        <div className="bg-white min-h-full min-w-full ">
          <div className="my-10 justify-center  ">
            <img src="" alt="" />
            <h3 className="text-xl text-gray-950"> Rs Purbalingga</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid grid-cols-2">
            <div>Test 1</div>
            <div>Test 2</div>
          </div>
        </div>
      </section>
    </>
  );
}
