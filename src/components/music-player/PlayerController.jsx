import {
  MdShuffle,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeDownAlt,
  MdOutlineRepeatOne,
  MdOutlineRepeat,
  MdList,
} from "react-icons/md";
import { getDurationString } from "../../utils";
import ProggressBar from "./ProggressBar";

const REPEAT = {
  off: "OFF",
  once: "ONCE",
  list: "LIST",
};

const SONG = {
  next: 1,
  prev: -1,
};

function PlayerController(props) {
  const { isShuffle, isPlaying, repeatMode, timeProgress, percent, duration } =
    props;

  const {
    shuffleClickHandler,
    changeSongHandler,
    playHandler,
    repeatHandler,
    onChangeTime,
    onProgressMove,
  } = props;

  return (
    <>
      <div className="w-2/5 flex flex-col items-center">
        <div className="select-none text-white flex flex-row items-center gap-3">
          <button
            className={`text-gray-400 hover:text-white ${
              isShuffle ? "text-link-active scale-125" : ""
            }`}
            onClick={shuffleClickHandler}
          >
            <MdShuffle fontSize={24} />
          </button>

          <button
            onClick={() => changeSongHandler(SONG.prev)}
            className="text-gray-400 hover:text-white"
          >
            <MdSkipPrevious fontSize={32} />
          </button>

          <button onClick={playHandler}>
            {isPlaying ? (
              <MdPauseCircleFilled fontSize={40} />
            ) : (
              <MdPlayCircleFilled fontSize={40} />
            )}
          </button>

          <button
            onClick={() => changeSongHandler(SONG.next)}
            className="text-gray-400 hover:text-white"
          >
            <MdSkipNext fontSize={32} />
          </button>

          <button
            className={`text-gray-400 hover:text-white ${
              repeatMode !== REPEAT.off ? "text-link-active scale-125" : ""
            }`}
            onClick={repeatHandler}
          >
            {repeatMode === REPEAT.once ? (
              <MdOutlineRepeatOne fontSize={23} />
            ) : (
              <MdOutlineRepeat fontSize={23} />
            )}
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
    </>
  );
}

export default PlayerController;
