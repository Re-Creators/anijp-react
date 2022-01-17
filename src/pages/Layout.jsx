import { Outlet } from "react-router-dom";
import MusicPlayer from "../components/music-player/MusicPlayer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <div>
      <ToastContainer autoClose={3000} theme="colored" position="top-right" />
      <div className="w-full flex flex-col md:flex-row md:justify-end">
        {/* Sidebar */}
        <Sidebar />
        <div className="w-full md:w-view-md lg:w-3/4 xl:w-[82%] ">
          <Topbar />
          <Outlet />
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Layout;
