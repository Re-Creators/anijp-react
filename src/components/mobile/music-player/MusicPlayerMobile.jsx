import React, { useEffect, useRef } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveSong,
  selectActiveSong,
  selectIsPlaying,
  selectSongs,
  setIsPlaying,
} from "../../../features/music-player/musicPlayerSlice";

function MusicPlayerMobile() {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const isPlaying = useSelector(selectIsPlaying);
  const songs = useSelector(selectSongs);
  const activeSong = useSelector(selectActiveSong);

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
    <div className="relative w-full bg-primary border-b-2 border-primary-300 p-5 text-white flex flex-row justify-between">
      <div className="w-16 h-16 p-3  bg-secondary rounded-full absolute -top-2">
        <img
          src={activeSong ? activeSong.image : "/images/new-playlist.png"}
          alt=""
          className={`w-full h-full object-cover rounded-full animate-spin-slow ${
            isPlaying ? "" : "animation-pause"
          }`}
        />
      </div>
      <div className="text-white ml-20 w-48 text-sm">
        <span className="text-xs clamp-1 text-gray-300">
          {activeSong?.title}
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
    </div>
  );
}

export default MusicPlayerMobile;
