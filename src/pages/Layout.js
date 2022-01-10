import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Layout() {
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row md:justify-end">
        {/* Sidebar */}
        <Sidebar />
        <div className="w-full md:w-view-md lg:w-3/4 xl:w-[82%] mt-12 px-10 pt-10 h-screen overflow-y-auto pb-96 hide-scrollbar">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
