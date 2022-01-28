import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../../components/mobile/MenuBar";
import PlayerContainer from "../../components/mobile/music-player/PlayerContainer";

function MobileLayout() {
  return (
    <div className="">
      <Outlet />
      <div className="fixed inset-x-0 z-20 bottom-0">
        <PlayerContainer />
        <MenuBar />
      </div>
    </div>
  );
}

export default MobileLayout;
