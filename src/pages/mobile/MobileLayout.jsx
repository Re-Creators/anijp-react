import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MenuBar from "../../components/mobile/MenuBar";
import PlayerContainer from "../../components/mobile/music-player/PlayerContainer";
import LoginModalContainer from "../../components/modals/LoginModalContainer";

function MobileLayout() {
  return (
    <div className="">
      <ToastContainer
        autoClose={3000}
        theme="colored"
        position="top-center"
        hideProgressBar={true}
      />
      <LoginModalContainer />
      <Outlet />
      <div className="fixed inset-x-0 z-20 bottom-0">
        <PlayerContainer />
        <MenuBar />
      </div>
    </div>
  );
}

export default MobileLayout;
