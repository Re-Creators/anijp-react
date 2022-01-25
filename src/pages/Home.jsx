import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSlider from "../components/home/HomeSlider";
import { MdPlayCircleFilled } from "react-icons/md";
import { client } from "../sanityClient";
import { getAllPlaylist } from "../query/playlistQuery";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";

function Home() {
  const [playlistData, setPlaylistData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    client.fetch(getAllPlaylist).then((data) => {
      setPlaylistData(data);
    });
  }, []);

  return (
    <div className="mt-5 px-10 pb-96 h-screen hide-scrollbar">
      <HomeSlider />
      <div className="mt-10">
        <h1 className="text-white md:text-lg lg:text-xl font-semibold">
          Most Popular Soundtrack
        </h1>
        <div className="text-white mt-5 flex flex-row flex-wrap">
          {playlistData.map((playlist) => (
            <div className="mr-10 mb-5" key={playlist._id}>
              <Link
                to={`/playlist/${playlist._id}`}
                className="relative block w-32 h-40 md:w-40 lg:w-48 md:h-52 lg:h-60 overflow-y-hidden mb-2 group"
              >
                <img
                  src={playlist.cover}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        addNewSongs({ songs: playlist.songs, indexSong: 0 })
                      );
                      dispatch(setIsPlaying(true));
                    }}
                  >
                    <MdPlayCircleFilled className="material-icons text-4xl absolute right-3 bottom-3" />
                  </button>
                </div>
              </Link>
              <span className="md:w-40 lg:w-48 line-clamp-2 overflow-x-hidden text-xs md:text-sm lg:text-base">
                {playlist.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
