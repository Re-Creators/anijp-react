import { useState, useEffect, useRef, useCallback } from "react";
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
import { REPEAT } from "../../utils/types";

function MusicPlayer() {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);
  const songs = useSelector(selectSongs);

  const audioRef = useRef();
  const readyToPlay = useRef(false);
  const trackIndex = useRef(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [timeProgress, setTimeProgress] = useState(0);

  const [isShuffle, setIsShuffle] = useState(false);
  const [progressMoving, setProgressMoving] = useState(false);
  const [repeatMode, setRepeatMode] = useState(REPEAT.off);

  let percent = isNaN(timeProgress / duration)
    ? 0
    : (timeProgress / duration) * 100;

  const playHandler = () => {
    if (songs.length <= 0 && !activeSong) return;

    if (!readyToPlay.current) {
      readyToPlay.current = true;
    }

    dispatch(setIsPlaying(!isPlaying));
  };

  const onChangeVolume = useCallback((vol) => setVolume(vol), []);

  const onUpdateTime = (e) => {
    if (!progressMoving) {
      setTimeProgress(e.target.currentTime);
    }
  };

  const onProgressMove = useCallback((time) => {
    setProgressMoving(true);
    setTimeProgress(time);
  }, []);

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
      trackIndex.current = songs.findIndex(
        (song) => song._id === activeSong._id
      );
      dispatch(setIsPlaying(true));
      audioRef.current.play();
    }
  }, [activeSong, dispatch, songs]);

  const onChangeTime = useCallback((time) => {
    if (audioRef.current) {
      setProgressMoving(false);
      audioRef.current.currentTime = time;
    }
  }, []);

  const changeSongHandler = (value) => {
    if (songs.length <= 0) return;
    trackIndex.current = trackIndex.current + value;

    if (isShuffle) {
      trackIndex.current = Math.floor(Math.random() * songs.length);
    } else if (trackIndex.current < 0) {
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bg-primary fixed bottom-0 z-50 flex min-w-[765px] select-none flex-row items-center justify-between py-5 px-5 shadow-2xl md:w-full">
      <div className="relative flex flex-row items-center md:w-1/4 lg:w-1/5">
        <div className="bg-secondary absolute h-20  w-20 rounded-full p-3">
          <ProgressRing stroke={4} radius={48} progress={percent} />
          <div className="absolute top-0 left-0 h-full w-full scale-[.70]">
            <img
              src={activeSong ? activeSong.image : "/images/new-playlist.png"}
              alt=""
              className={`animate-spin-slow h-full w-full rounded-full object-cover ${
                isPlaying ? "" : "animation-pause"
              }`}
            />
          </div>
        </div>
        <div className="ml-24 text-white">
          <h1 className="line-clamp-1 md:w-28 md:text-sm lg:w-auto lg:text-base">
            {activeSong?.title}
          </h1>
          <span className="line-clamp-1 text-gray-300 md:w-28  md:text-xs lg:w-auto lg:text-sm">
            {activeSong?.artist}
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

      <PlayerExtraControl changeVolume={onChangeVolume} />

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
