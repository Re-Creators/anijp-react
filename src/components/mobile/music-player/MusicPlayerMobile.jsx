import React from "react";
import { MdPlayArrow } from "react-icons/md";

function MusicPlayerMobile() {
  return (
    <div className="relative w-full bg-primary border-b-2 border-primary-300 p-5 text-white flex flex-row justify-between">
      <div className="w-16 h-16 p-3  bg-secondary rounded-full absolute -top-2">
        <img
          src="/sample/images/snk.jpg"
          alt=""
          className="w-full h-full rounded-full border-2"
        />
      </div>
      <div className="text-white ml-20 w-48 text-sm">
        <span className="text-xs clamp-1 text-gray-300">Aimer</span>
      </div>
      <audio></audio>
      <button>
        <MdPlayArrow fontSize={28} />
      </button>
    </div>
  );
}

export default MusicPlayerMobile;
