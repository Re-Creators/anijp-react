import React from "react";
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

function MusicPlayer() {
  return (
    <div className="fixed z-50 w-full flex flex-row items-center justify-between py-5 px-5 bottom-0 bg-primary shadow-2xl">
      <div className="md:w-1/4 lg:w-1/5 flex flex-row items-center relative">
        <div className="w-20 h-20 p-3  bg-secondary rounded-full absolute">
          <img
            src="/sample/images/snk.jpg"
            alt=""
            className="w-full h-full rounded-full border-2"
          />
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

      <div className="w-2/5 flex flex-col items-center">
        <div className="select-none">
          <ul className="text-white flex flex-row items-center gap-3">
            <li>
              <button>
                <MdShuffle fontSize={24} />
              </button>
            </li>
            <li>
              <button>
                <MdSkipPrevious fontSize={32} />
              </button>
            </li>
            <li>
              <button>
                <MdPlayCircleFilled fontSize={40} />
              </button>
            </li>
            <li>
              <button>
                <MdSkipNext fontSize={32} />
              </button>
            </li>
            <li>
              <button>
                <ImLoop fontSize={18} />
              </button>
            </li>
          </ul>
        </div>
        <div className="w-4/5 flex flex-row text-white items-center">
          <span className="text-xs select-none">00:01</span>
          <div className="relative bg-primary-300 w-4/5 h-1 mx-3 cursor-pointer group">
            <div className="absolute h-full left-0 bg-secondary">
              <span className="hidden absolute top-1/2 transform -translate-y-1/2 right-0 h-2 w-2 rounded-full bg-secondary group-hover:block"></span>
            </div>
          </div>
          <span className="text-xs select-none">04:04</span>
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
      <audio></audio>
    </div>
  );
}

export default MusicPlayer;
