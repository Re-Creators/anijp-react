import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSongs,
  selectActiveSong,
  selectIsPlaying,
  setIsPlaying,
} from "../../../features/music-player/musicPlayerSlice";
import { MdFavorite, MdLibraryMusic } from "react-icons/md";
import Song from "../list-items/Song";

function PlaylistDetail({ detail }) {
  const dispatch = useDispatch();

  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);

  const onPlaySong = (indexSong, songId) => {
    if (activeSong !== null && songId === activeSong._id) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(addNewSongs({ songs: detail.songs, indexSong }));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="relative h-96 w-full">
        <div className="absolute h-full w-full">
          <img
            src={detail.cover}
            alt="background-cover"
            className="absolute z-[-1] h-full w-full object-cover object-center blur-sm filter"
          />
          <div className="bg-overlay-playlist-dark absolute inset-0"></div>
        </div>
        <div className="absolute flex h-full w-full flex-col items-center justify-center text-white backdrop-blur-2xl backdrop-filter">
          <div className="bg-primary-100 h-44 w-40 overflow-hidden rounded-md">
            <img
              src={detail.cover}
              alt="playlist Cover"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="mt-2 text-2xl font-semibold">{detail.name} </h1>
          <div className="mt-3 flex w-4/5 flex-col items-center text-xs">
            <p className=" clamp-2 text-center">{detail.description} </p>
            <div className="mt-3 flex  flex-row text-xs">
              {detail.likes !== undefined && (
                <div className="mr-3 flex flex-row items-center">
                  <MdFavorite className="mr-1 text-lg" />
                  <span> {detail.likes} Likes</span>
                </div>
              )}

              <div className="flex flex-row items-center">
                <MdLibraryMusic className="mr-1 text-lg" />
                <span> {detail.songs.length} Songs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-playlist-container h-96 w-full">
        <div className="px-2 py-5 pb-56">
          <div>
            <button
              className="mb-10 flex flex-row items-center"
              onClick={() => {
                dispatch(addNewSongs({ songs: detail.songs, indexSong: 0 }));
                dispatch(setIsPlaying(true));
              }}
            >
              <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
              >
                <circle cx="40" cy="40" r="25" fill="white" />
                <path
                  d="M40 6.66667C21.6 6.66667 6.66669 21.6 6.66669 40C6.66669 58.4 21.6 73.3333 40 73.3333C58.4 73.3333 73.3334 58.4 73.3334 40C73.3334 21.6 58.4 6.66667 40 6.66667ZM33.3334 55V25L53.3334 40L33.3334 55Z"
                  fill="#2C62BF"
                />
              </svg>
              <span className="ml-3 text-lg text-white">Play All</span>
            </button>
          </div>
          <div className="px-1 text-white">
            {detail.songs.map((song, index) => (
              <Song
                key={song._id}
                indexSong={index}
                title={song.title}
                artist={song.artist}
                dispatch={dispatch}
                activeSong={activeSong}
                isPlaying={isPlaying}
                songId={song._id}
                onPlaySong={onPlaySong}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetail;
