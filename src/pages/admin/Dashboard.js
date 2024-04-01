import React from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
export default function DashboardAdmin() {
  return (
    <>
      <SidebarAdmin />
      <div className="flex justify-center w-[100%] mt-20">
        <section className="s-content w-[390px] md:w-[1125px] px-5 md:px-10  py-5 lg:pl-28">
          <div className="bg-white rounded-lg w-full min-h-96">
            <p>Dsahboard</p>
          </div>
        </section>
      </div>
    </>
  );
}
