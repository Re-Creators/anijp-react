import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  changeActiveSong,
  selectActiveSong,
  selectSongs,
} from "../../features/music-player/musicPlayerSlice";

function PlaylistQueueMobile({ hide, dispatch }) {
  const activeSong = useSelector(selectActiveSong);
  const songs = useSelector(selectSongs);

  return (
    <div className="fixed z-[60] w-full h-4/6 left-0 bottom-0 bg-primary-400 py-14 px-5">
      <button className="absolute right-5 top-3" onClick={hide}>
        <MdKeyboardArrowDown className="text-gray-400 hover:text-white text-5xl" />
      </button>
      <div className="mx-auto h-full">
        <div className="text-white flex flex-row justify-between">
          <h1 className="text-xl font-semibold">
            Playlist ({songs.length}) - Song & Albums)
          </h1>
        </div>
        <div className="mt-5 h-full hide-scrollbar">
          {songs.map((song) => (
            <div
              className={`flex flex-row items-center text-white py-3 px-5 transition duration-200  rounded-sm cursor-pointer group mb-3 ${
                activeSong._id === song._id ? "bg-list-hover" : ""
              }`}
              onClick={() => dispatch(changeActiveSong(song))}
            >
              <div>
                <h1> {song.title} </h1>
                <span className="text-sm text-gray-400"> {song.artist} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistQueueMobile;
