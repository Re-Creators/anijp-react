import React from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

function Song({
  songId,
  activeSong,
  isPlaying,
  title,
  artist,
  onPlaySong,
  indexSong,
}) {
  return (
    <div
      className={`flex flex-row w-full justify-between py-3 px-5 mb-2 ${
        activeSong?._id === songId ? "bg-primary-300" : ""
      }`}
    >
      <div>
        <h1>{title} </h1>
        <span className="text-sm text-gray-300">{artist} </span>
      </div>
      <button onClick={() => onPlaySong(indexSong, songId)}>
        {isPlaying && activeSong._id === songId ? (
          <MdPause />
        ) : (
          <MdPlayArrow className="text-2xl" />
        )}
      </button>
    </div>
  );
}

export default Song;
