import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { selectHelmetTitle } from "../../features/helmet-title/helmetTitleSlice";
import {
  selectActiveSong,
  selectIsPlaying,
} from "../../features/music-player/musicPlayerSlice";

function HelmetSetter() {
  console.log("HELMET RENDER");
  const title = useSelector(selectHelmetTitle);
  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);

  const musicTitle = useRef("");

  useEffect(() => {
    if (isPlaying) {
      musicTitle.current = `${activeSong.title} · ${activeSong.artist}`;
    }
  }, [isPlaying, activeSong]);
  return (
    <Helmet>
      <title>{isPlaying ? musicTitle.current : title}</title>
      <meta name="description" content="AniJP - Music for life" />
    </Helmet>
  );
}

export default HelmetSetter;
