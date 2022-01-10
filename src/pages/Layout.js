import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row md:justify-end">
        {/* Topbar */}
        {/* Sidebar */}
        <Sidebar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
