import React, { useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  changeActiveSong,
  selectActiveSong,
  selectIsPlaying,
  selectSongs,
  setIsPlaying,
} from "../../../features/music-player/musicPlayerSlice";
import MusicInfo from "./MusicInfo";

function MusicPlayerMobile() {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const isPlaying = useSelector(selectIsPlaying);
  const songs = useSelector(selectSongs);
  const activeSong = useSelector(selectActiveSong);

  const [showMusicInfo, setShowMusicInfo] = useState(false);

  const trackIndex = useRef(0);

  useEffect(() => {
    if (activeSong) {
      trackIndex.current = songs.findIndex(
        (song) => song._id === activeSong._id
      );
      dispatch(setIsPlaying(true));
      audioRef.current.play();
    }
  }, [activeSong, dispatch, songs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const songEndHanlder = () => {
    if (trackIndex.current === songs.length - 1) {
      dispatch(setIsPlaying(false));
      return;
    } else {
      trackIndex.current += 1;

      dispatch(changeActiveSong(songs[trackIndex.current]));
      audioRef.current.autoplay = true;
    }
  };

  return (
    <div className="relative w-full bg-primary border-b-2 border-primary-300 px-5  text-white flex flex-row justify-between h-[60px]">
      <div className="w-16 h-16 p-3  bg-secondary rounded-full absolute -top-2">
        <img
          src={activeSong ? activeSong.image : "/images/new-playlist.png"}
          alt=""
          className={`w-full h-full object-cover rounded-full animate-spin-slow ${
            isPlaying ? "" : "animation-pause"
          }`}
          onClick={() => setShowMusicInfo(true)}
        />
      </div>
      <div
        className="text-white ml-20 w-full h-full text-sm py-3 flex flex-col"
        onClick={() => setShowMusicInfo(true)}
      >
        <span className="text-sm clamp-1  ">{activeSong?.title}</span>
        <span className="text-[0.65rem] clamp-1 text-gray-300">
          {activeSong?.artist}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={activeSong?.songUrl}
        onEnded={songEndHanlder}
      ></audio>

      <button onClick={() => dispatch(setIsPlaying(!isPlaying))}>
        {isPlaying ? <MdPause fontSize={28} /> : <MdPlayArrow fontSize={28} />}
      </button>

      <CSSTransition
        in={showMusicInfo}
        timeout={400}
        classNames="slideUpInfo"
        unmountOnExit
      >
        <MusicInfo hide={() => setShowMusicInfo(false)} />
      </CSSTransition>
    </div>
  );
}

export default MusicPlayerMobile;
