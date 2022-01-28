import React from "react";
import { useSelector } from "react-redux";
import { selectActiveSong } from "../../../features/music-player/musicPlayerSlice";
import MusicPlayerMobile from "./MusicPlayerMobile";

function PlayerContainer() {
  const activeSong = useSelector(selectActiveSong);

  if (activeSong) return <MusicPlayerMobile />;
  return null;
}

export default PlayerContainer;
