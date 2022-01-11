import {
  MdShuffle,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeDownAlt,
  MdList,
} from "react-icons/md";
import { ImLoop } from "react-icons/im";
import { useRef, useEffect, useState } from "react";
import { getDurationString } from "../../utils";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setIsPlaying,
  selectIsPlaying,
  changeActiveSong,
  selectActiveSong,
} from "../../features/music-player/musicPlayerSlice";
import ProggressBar from "./ProggressBar";

const SONG = {
  next: 1,
  prev: -1,
};

const songs = [
  "/sample/musics/music1.mp3",
  "/sample/musics/music2.mp3",
  "/sample/musics/music3.mp3",
];

function PlayerController() {
  console.log("PlayerController render...");
  const audioRef = useRef();
  const readyToPlay = useRef(false);
  const trackIndex = useRef(0);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressMoving, setProgressMoving] = useState(false);

  let percent = isNaN(timeProgress / duration)
    ? 0
    : (timeProgress / duration) * 100;

  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);

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

  const playHandler = () => {
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

  useEffect(() => {
    if (activeSong && readyToPlay.current) {
      dispatch(setIsPlaying(true));
    }
  }, [activeSong]);

  useEffect(() => {
    dispatch(changeActiveSong(songs[0]));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div className="w-2/5 flex flex-col items-center">
        <div className="select-none text-white flex flex-row items-center gap-3">
          <button>
            <MdShuffle fontSize={24} />
          </button>

          <button onClick={() => changeSongHandler(SONG.prev)}>
            <MdSkipPrevious fontSize={32} />
          </button>

          <button onClick={playHandler}>
            {isPlaying ? (
              <MdPauseCircleFilled fontSize={40} />
            ) : (
              <MdPlayCircleFilled fontSize={40} />
            )}
          </button>

          <button onClick={() => changeSongHandler(SONG.next)}>
            <MdSkipNext fontSize={32} />
          </button>

          <button>
            <ImLoop fontSize={18} />
          </button>
        </div>
        <div className="w-4/5 flex flex-row text-white items-center mt-3">
          <span className="text-xs select-none">
            {getDurationString(timeProgress)}
          </span>
          <ProggressBar
            percent={percent}
            onChangeTime={onChangeTime}
            duration={duration}
            onProgressMove={onProgressMove}
          />
          <span className="text-xs select-none">
            {getDurationString(duration)}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center lg:mr-10">
        <div className="flex flex-row items-center">
          <button aria-label="mute">
            <MdVolumeDownAlt
              className="text-gray-300 transition duration-200 hover:text-white"
              fontSize={24}
            />
          </button>
          <div className="relative bg-primary-300 w-20 h-1 mx-3 mb-1 cursor-pointer group">
            <div className="absolute h-full w-1/2 left-0 bg-secondary">
              <span className="hidden absolute top-1/2 transform -translate-y-1/2 right-0 h-2 w-2 rounded-full bg-secondary group-hover:block"></span>
            </div>
          </div>
        </div>
        <button className="ml-3">
          <MdList
            className="text-gray-300 transition duration-200 hover:text-white"
            fontSize={24}
          />
        </button>
      </div>
      <audio
        ref={audioRef}
        src={activeSong}
        onTimeUpdate={onUpdateTime}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      ></audio>
    </>
  );
}

export default PlayerController;
