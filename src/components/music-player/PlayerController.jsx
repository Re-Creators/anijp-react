import {
  MdShuffle,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeatOne,
  MdOutlineRepeat,
} from "react-icons/md";
import { getDurationString, getRepeatContent } from "../../utils";
import ProggressBar from "./ProggressBar";
import { SONG, REPEAT } from "../../utils/types";
import TippyInfo from "../tippy/TippyInfo";

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
    <div className="flex w-2/5 flex-col items-center">
      <div className="flex select-none flex-row items-center gap-3 text-white">
        <TippyInfo content={isShuffle ? "Disable Shuffle" : "Enable Shuffle"}>
          <button
            className={`text-gray-400 hover:text-white ${
              isShuffle ? "text-link-active scale-125" : ""
            }`}
            onClick={shuffleClickHandler}
          >
            <MdShuffle fontSize={24} />
          </button>
        </TippyInfo>

        <TippyInfo content="Prev">
          <button
            onClick={() => changeSongHandler(SONG.prev)}
            className="text-gray-400 hover:text-white"
          >
            <MdSkipPrevious fontSize={32} />
          </button>
        </TippyInfo>

        <TippyInfo content={isPlaying ? "Pause" : "Play"}>
          <button onClick={playHandler}>
            {isPlaying ? (
              <MdPauseCircleFilled fontSize={40} />
            ) : (
              <MdPlayCircleFilled fontSize={40} />
            )}
          </button>
        </TippyInfo>

        <TippyInfo content="Next">
          <button
            onClick={() => changeSongHandler(SONG.next)}
            className="text-gray-400 hover:text-white"
          >
            <MdSkipNext fontSize={32} />
          </button>
        </TippyInfo>

        <TippyInfo content={getRepeatContent(repeatMode)}>
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
        </TippyInfo>
      </div>
      <div className="mt-3 flex w-4/5 flex-row items-center text-white">
        <span className="select-none text-xs">
          {getDurationString(timeProgress)}
        </span>
        <ProggressBar
          percent={percent}
          onChangeTime={onChangeTime}
          duration={duration}
          onProgressMove={onProgressMove}
          progressBarColor="bg-primary-300"
          barColor="bg-secondary"
          pointColor="bg-secondary"
          showPoint={false}
        />
        <span className="select-none text-xs">
          {getDurationString(duration)}
        </span>
      </div>
    </div>
  );
}

export default PlayerController;
