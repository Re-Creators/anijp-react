import { useState, useEffect, useRef } from "react";
import PlayerController from "./PlayerController";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setIsPlaying,
  selectIsPlaying,
  changeActiveSong,
  selectActiveSong,
  selectSongs,
} from "../../features/music-player/musicPlayerSlice";
import ProgressRing from "./ProgressRing";
import PlayerExtraControl from "./PlayerExtraControl";

const REPEAT = {
  off: "OFF",
  once: "ONCE",
  list: "LIST",
};

function MusicPlayer() {
  const audioRef = useRef();
  const readyToPlay = useRef(false);
  const trackIndex = useRef(0);

  const [duration, setDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  const [isShuffle, setIsShuffle] = useState(false);
  const [progressMoving, setProgressMoving] = useState(false);
  const [repeatMode, setRepeatMode] = useState(REPEAT.off);

  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);
  const songs = useSelector(selectSongs);

  let percent = isNaN(timeProgress / duration)
    ? 0
    : (timeProgress / duration) * 100;

  const playHandler = () => {
    if (songs.length <= 0) return;

    if (!readyToPlay.current) {
      readyToPlay.current = true;
    }

    dispatch(setIsPlaying(!isPlaying));
  };

  const onUpdateTime = (e) => {
    if (!progressMoving) {
      setTimeProgress(e.target.currentTime);
    }
  };

  const onProgressMove = (time) => {
    setProgressMoving(true);
    setTimeProgress(time);
  };

  const repeatHandler = () => {
    if (repeatMode === REPEAT.off) {
      setRepeatMode(REPEAT.once);
    } else if (repeatMode === REPEAT.once) {
      setRepeatMode(REPEAT.list);
    } else {
      setRepeatMode(REPEAT.off);
    }
  };

  useEffect(() => {
    if (activeSong) {
      dispatch(setIsPlaying(true));
      audioRef.current.play();
    }
  }, [activeSong, dispatch]);

  const onChangeTime = (time) => {
    if (audioRef.current) {
      setProgressMoving(false);
      audioRef.current.currentTime = time;
    }
  };

  const changeSongHandler = (value) => {
    trackIndex.current = trackIndex.current + value;

    if (trackIndex.current < 0) {
      trackIndex.current = songs.length - 1;
    } else if (trackIndex.current >= songs.length) {
      trackIndex.current = 0;
    }

    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }
    dispatch(changeActiveSong(songs[trackIndex.current]));

    audioRef.current.autoplay = true;
  };

  const songEndHanlder = () => {
    if (repeatMode === REPEAT.once) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle) {
      trackIndex.current = Math.floor(Math.random() * songs.length);
      dispatch(changeActiveSong(songs[trackIndex.current]));
      audioRef.current.autoplay = true;
    } else if (
      trackIndex.current === songs.length - 1 &&
      repeatMode === REPEAT.list
    ) {
      changeSongHandler(1);
    } else if (trackIndex.current === songs.length - 1) {
      dispatch(setIsPlaying(false));
      return;
    } else {
      changeSongHandler(1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed z-50 w-full flex flex-row items-center justify-between py-5 px-5 bottom-0 bg-primary shadow-2xl select-none">
      <div className="md:w-1/4 lg:w-1/5 flex flex-row items-center relative">
        <div className="w-20 h-20 p-3  bg-secondary rounded-full absolute">
          <ProgressRing stroke={4} radius={48} progress={percent} />
          <div className="absolute w-full h-full top-0 left-0 scale-[.70]">
            <img
              src="/sample/images/snk.jpg"
              alt=""
              className={`w-full h-full object-cover rounded-full animate-spin-slow ${
                isPlaying ? "" : "animation-pause"
              }`}
            />
          </div>
        </div>
        <div className="text-white ml-24">
          <h1 className="md:text-sm lg:text-base md:w-28 lg:w-auto clamp-1">
            Kataomoi
          </h1>
          <span className="md:text-xs lg:text-sm text-gray-300  md:w-28 lg:w-auto clamp-1">
            Aimer
          </span>
        </div>
      </div>

      <PlayerController
        isShuffle={isShuffle}
        isPlaying={isPlaying}
        repeatMode={repeatMode}
        timeProgress={timeProgress}
        percent={percent}
        duration={duration}
        shuffleClickHandler={() => setIsShuffle(!isShuffle)}
        changeSongHandler={changeSongHandler}
        playHandler={playHandler}
        repeatHandler={repeatHandler}
        onChangeTime={onChangeTime}
        onProgressMove={onProgressMove}
      />

      <PlayerExtraControl />

      <audio
        ref={audioRef}
        src={activeSong?.songUrl}
        onTimeUpdate={onUpdateTime}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={songEndHanlder}
      ></audio>
    </div>
  );
}

export default MusicPlayer;
