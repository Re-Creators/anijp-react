import { useEffect, useState } from "react";
import Detail from "../components/playlist/Detail";
import SongList from "../components/playlist/SongList";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "..//features/music-player/musicPlayerSlice";
import { client } from "../sanityClient";
import { useSelector } from "react-redux";
import { selectLikedSongs } from "../features/user/userSlice";
import { getFavoriteSongs } from "../query/songQuery";

function FavoriteSong() {
  console.log("render Playlist");
  const dispatch = useDispatch();

  const likedSongs = useSelector(selectLikedSongs);
  const [songs, setSongs] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (likedSongs && likedSongs.length > 0) {
      const query = getFavoriteSongs;
      const params = { listId: likedSongs };
      client.fetch(query, params).then((data) => {
        setSongs(data);
      });
    }
  }, [likedSongs]);

  return (
    <div
      className={`text-white ${
        showMenu ? "hide-scrollbar" : "overflow-y-hidden"
      }  h-screen`}
    >
      {/* Playlist Details  */}
      <Detail
        songCount={songs.length}
        playlistName="Favorite Song"
        cover="/images/favorite.png"
        description="Collection favorite song"
        type="favorite"
      />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen pb-36 ">
        <div className="flex flex-row items-center mb-10">
          <button
            onClick={() => {
              dispatch(addNewSongs({ songs, indexSong: 0 }));
              dispatch(setIsPlaying(true));
            }}
          >
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
        </div>

        <SongList
          songs={songs}
          dispatch={dispatch}
          toggleMenu={() => setShowMenu(!showMenu)}
        />
      </div>
    </div>
  );
}

export default FavoriteSong;
