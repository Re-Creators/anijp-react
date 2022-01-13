import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MusicPlayer from "../components/music-player/MusicPlayer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Layout() {
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row md:justify-end">
        {/* Sidebar */}
        <Sidebar />
        <div className="w-full md:w-view-md lg:w-3/4 xl:w-[82%] h-screen overflow-y-auto hide-scrollbar">
          <Topbar />
          <Outlet />
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Layout;
