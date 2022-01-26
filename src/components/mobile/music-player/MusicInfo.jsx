import React from "react";
import {
  MdExpandMore,
  MdFavorite,
  MdList,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

function MusicInfo({ hide }) {
  return (
    <div className="fixed z-40 inset-0 bg-music-info p-3">
      <button onClick={hide}>
        <MdExpandMore className="text-4xl text-white" />
      </button>
      <img
        src="/sample/images/snk.jpg"
        alt=""
        className="w-4/5 h-[300px] mx-auto rounded-md object-cover"
      />
      <div className="text-white mt-5 text-2xl text-center">
        <h1>currentSong.title </h1>
        <h2 className="text-lg text-gray-300"> currentSong.artist </h2>
      </div>
      <div className="absolute bottom-10 w-full  px-3">
        <div className="w-full flex flex-row justify-between text-white">
          <button>
            <MdFavorite className="text-4xl" />
          </button>
          <div className="flex flex-row">
            <button>
              <MdSkipPrevious className="text-4xl" />
            </button>
            <button className="mx-3">
              <MdPlayCircleFilled className="text-5xl" />
            </button>
            <button>
              <MdSkipNext className="text-4xl" />
            </button>
          </div>
          <button className="mr-5">
            <MdPlaylistAdd className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-row text-white text-xs items-center mr-5 mt-5 justify-between">
          <span className="w-10"> 00:00 </span>
          <div className="relative w-4/5 h-1 bg-white  ml-3 mr-6">
            <div className="h-full w-0 bg-primary relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white"></div>
            </div>
          </div>
          <span className="w-10"> 00:00</span>
        </div>
        <div className="flex flex-row justify-between text-white mt-5">
          <button className="mr-5">
            <MdList className="text-3xl" />
          </button>
          <button className="mr-5">
            <MdShare className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicInfo;
