import { Outlet } from "react-router-dom";
import MusicPlayer from "../components/music-player/MusicPlayer";
import { ToastContainer } from "react-toastify";
import LoginModalContainer from "../components/modals/LoginModalContainer";
import Topbar from "../components/menu/Topbar";
import Sidebar from "../components/menu/Sidebar";

function Layout() {
  return (
    <div>
      <ToastContainer
        autoClose={3000}
        theme="colored"
        position="top-right"
        hideProgressBar={true}
      />
      <LoginModalContainer />
      <div className="flex w-full flex-col md:flex-row md:justify-end">
        {/* Sidebar */}
        <Sidebar />
        <div className="w-full md:w-view-md lg:w-3/4 xl:w-[82%] ">
          <Topbar />
          <div className="pt-[50px]">
            <Outlet />
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Layout;
