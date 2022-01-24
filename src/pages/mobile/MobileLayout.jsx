import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../../components/mobile/MenuBar";

function MobileLayout() {
  return (
    <div className="">
      <Outlet />
      <MenuBar />
    </div>
  );
}

export default MobileLayout;
