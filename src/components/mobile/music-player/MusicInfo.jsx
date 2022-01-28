import React, { useCallback, useEffect, useState } from "react";
import {
  MdExpandMore,
  MdFavorite,
  MdList,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { setIsPlaying } from "../../../features/music-player/musicPlayerSlice";
import { getDurationString } from "../../../utils";
import ProggressBar from "../../music-player/ProggressBar";
import PlaylistQueueMobile from "../PlaylistQueueMobile";

function MusicInfo({
  hide,
  audioRef,
  isPlaying,
  activeSong,
  dispatch,
  changeSongHandler,
}) {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showQueue, setShowQueue] = useState(false);

  let percent = isNaN(timeProgress / duration)
    ? 0
    : (timeProgress / duration) * 100;

  const onChangeTime = (time) => {
    audioRef.current.currentTime = time;
  };

  const onProgressMove = (time) => {
    setTimeProgress(time);
  };

  const onTimeUpdate = useCallback((e) => {
    const { currentTime } = e.srcElement;
    setTimeProgress(currentTime);
  }, []);

  useEffect(() => {
    setDuration(audioRef.current.duration);
    const audioRefValue = audioRef.current;

    audioRefValue.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioRefValue.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef, onTimeUpdate]);

  return (
    <div className="fixed z-40 inset-0 bg-music-info p-3">
      <button onClick={hide}>
        <MdExpandMore className="text-4xl text-white" />
      </button>
      <img
        src={activeSong.image}
        alt=""
        className="w-4/5 h-[300px] mx-auto rounded-md object-cover"
      />
      <div className="text-white mt-5 text-2xl text-center">
        <h1>{activeSong.title} </h1>
        <h2 className="text-lg text-gray-300"> {activeSong.artist} </h2>
      </div>
      <div className="absolute bottom-10 w-full  px-3">
        <div className="w-full flex flex-row justify-between text-white">
          <button>
            <MdFavorite className="text-4xl" />
          </button>
          <div className="flex flex-row">
            <button onClick={() => changeSongHandler(-1)}>
              <MdSkipPrevious className="text-4xl" />
            </button>
            <button
              className="mx-3"
              onClick={() => dispatch(setIsPlaying(!isPlaying))}
            >
              {isPlaying ? (
                <MdPauseCircleFilled className="text-5xl" />
              ) : (
                <MdPlayCircleFilled className="text-5xl" />
              )}
            </button>
            <button onClick={() => changeSongHandler(1)}>
              <MdSkipNext className="text-4xl" />
            </button>
          </div>
          <button className="mr-5">
            <MdPlaylistAdd className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-row text-white text-xs items-center mr-5 mt-5 justify-between">
          <span className="w-10">{getDurationString(timeProgress)}</span>
          <ProggressBar
            percent={percent}
            duration={duration}
            onChangeTime={onChangeTime}
            onProgressMove={onProgressMove}
            progressBarColor="bg-white"
            barColor="bg-primary"
            showPoint
            pointColor="bg-white"
          />

          <span className="w-10">{activeSong.duration}</span>
        </div>
        <div className="flex flex-row justify-between text-white mt-5">
          <button className="mr-5" onClick={() => setShowQueue(true)}>
            <MdList className="text-3xl" />
          </button>
          <button className="mr-5">
            <MdShare className="text-3xl" />
          </button>
        </div>
      </div>

      <CSSTransition
        in={showQueue}
        timeout={400}
        classNames="slideUpInfo"
        unmountOnExit
      >
        <PlaylistQueueMobile
          hide={() => setShowQueue(false)}
          dispatch={dispatch}
        />
      </CSSTransition>
    </div>
  );
}

export default MusicInfo;
