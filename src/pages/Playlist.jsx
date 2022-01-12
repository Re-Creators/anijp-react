import React from "react";
import { MdOutlineFavoriteBorder, MdLibraryMusic } from "react-icons/md";
import Detail from "../components/playlist/Detail";
import SongList from "../components/playlist/SongList";
function Playlists() {
  return (
    <div className="text-white">
      {/* Playlist Details  */}
      <Detail />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen">
        <div className="flex flex-row items-center mb-10">
          <button>
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
            >
              <circle cx="40" cy="40" r="25" fill="white" />
              <path
                d="M40 6.66667C21.6 6.66667 6.66669 21.6 6.66669 40C6.66669 58.4 21.6 73.3333 40 73.3333C58.4 73.3333 73.3334 58.4 73.3334 40C73.3334 21.6 58.4 6.66667 40 6.66667ZM33.3334 55V25L53.3334 40L33.3334 55Z"
                fill="#2C62BF"
              />
            </svg>
          </button>
          <button className="ml-3 mt-2">
            <MdOutlineFavoriteBorder className="text-4xl" />
          </button>
        </div>

        <SongList />
      </div>
    </div>
  );
}

export default Playlists;
