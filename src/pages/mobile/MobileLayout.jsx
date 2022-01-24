import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../../components/mobile/MenuBar";
import MusicPlayerMobile from "../../components/mobile/music-player/MusicPlayerMobile";

function MobileLayout() {
  return (
    <div className="">
      <Outlet />
      <div className="fixed inset-x-0 z-20 bottom-0">
        <MusicPlayerMobile />
        <MenuBar />
      </div>
    </div>
  );
}

export default MobileLayout;
