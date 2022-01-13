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
  );
}

export default PlayerController;
