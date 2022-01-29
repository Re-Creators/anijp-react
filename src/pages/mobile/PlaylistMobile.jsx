import { MdFavorite, MdLibraryMusic } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Song from "../../components/mobile/list-items/Song";
import {
  addNewSongs,
  selectActiveSong,
  selectIsPlaying,
  setIsPlaying,
} from "../../features/music-player/musicPlayerSlice";
import usePlaylistDetail from "../../hooks/usePlaylistDetail";

function PlaylistMobile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, status } = usePlaylistDetail(id);
  const isPlaying = useSelector(selectIsPlaying);
  const activeSong = useSelector(selectActiveSong);

  const onPlaySong = (indexSong, songId) => {
    if (activeSong !== null && songId === activeSong._id) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(addNewSongs({ songs: data.songs, indexSong }));
      dispatch(setIsPlaying(true));
    }
  };

  if (status === "loading" || status === "error") return null;
  return (
    <div className="h-screen overflow-y-auto">
      <div className="h-96 w-full relative">
        <img
          src={data.cover}
          alt="background-cover"
          className="absolute w-full h-full object-cover object-center z-0 filter blur-sm"
        />
        <div className="absolute text-white w-full h-full flex flex-col items-center justify-center backdrop-filter backdrop-blur-2xl">
          <img
            src={data.cover}
            alt="playlist Cover"
            className="w-40 h-44 rounded-md "
          />
          <h1 className="mt-2 font-semibold text-2xl">{data.name} </h1>
          <div className="text-xs mt-3 w-4/5 flex flex-col items-center">
            <p className=" text-center clamp-2">{data.description} </p>
            <div className="flex flex-row  text-xs mt-3">
              <div
                className="flex flex-row items-center mr-3"
                v-if="route.meta.mobileName !== 'myPlaylistMobile'"
              >
                <MdFavorite className="text-lg mr-1" />
                <span> {data.likes} Likes</span>
              </div>
              <div className="flex flex-row items-center">
                <MdLibraryMusic className="text-lg mr-1" />
                <span> {data.songs.length} Songs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-96 bg-playlist-container">
        <div className="px-2 py-5 pb-56">
          <div>
            <button
              className="flex flex-row items-center mb-10"
              onClick={() => {
                dispatch(addNewSongs({ songs: data.songs, indexSong: 0 }));
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
              <span className="ml-3 text-white text-lg">Play All</span>
            </button>
          </div>
          <div className="text-white px-1">
            {data.songs.map((song, index) => (
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

export default PlaylistMobile;