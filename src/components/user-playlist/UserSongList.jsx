import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdDelete,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addOneSong,
  selectActiveSong,
  selectIsPlaying,
} from "../../features/music-player/musicPlayerSlice";
import BarAnimation from "../UI/BarAnimation";

function UserSongList({ songs, onPlayAll, onSetPlaying, onDeleteSong }) {
  const dispatch = useDispatch();
  const activeSong = useSelector(selectActiveSong);
  const isPlaying = useSelector(selectIsPlaying);

  const playSong = (index, songId) => {
    if (activeSong !== null && songId === activeSong._id) {
      onSetPlaying(!isPlaying);
    } else {
      onPlayAll(index);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Song list Header */}
      {songs.length <= 0 ? (
        <div className="mt-5 text-center text-xl">
          <h1>Empty songs in this playlist</h1>
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-myplaylist gap-8 px-5 text-gray-400">
              <div className="place-self-center">
                <span>#</span>
              </div>
              <div>Song</div>
              <div>Duration</div>
              <div></div>
            </div>
            <div className="divider mx-5 mt-5 border-t-2 border-primary-300"></div>
          </div>

          <div className="flex flex-col">
            {songs.map((song, index) => (
              <div
                className="group grid grid-cols-myplaylist items-center gap-8 rounded-sm py-3 px-5 transition duration-200 hover:bg-list-hover"
                key={song._id}
              >
                <div className="w-10">
                  {(activeSong?._id !== song._id || !isPlaying) && (
                    <div className="ml-3 block text-sm group-hover:hidden">
                      {index + 1}
                    </div>
                  )}

                  {activeSong?._id === song._id && isPlaying && (
                    <BarAnimation />
                  )}
                  <button
                    className="hidden group-hover:block"
                    onClick={() => playSong(index, song._id)}
                  >
                    {isPlaying && activeSong._id === song._id ? (
                      <MdPauseCircleFilled className="mr-3 md:text-3xl lg:text-3xl" />
                    ) : (
                      <MdPlayCircleFilled className="mr-3 md:text-3xl lg:text-3xl" />
                    )}
                  </button>
                </div>
                <div className="my-1 text-sm">
                  <h1 className="font-semibold">{song.title}</h1>
                  <span className="text-xs text-description">
                    {song.artist}
                  </span>
                </div>
                <div className="ml-2">{song.duration}</div>
                <div className="flex flex-row">
                  <button onClick={() => dispatch(addOneSong(song))}>
                    <MdPlaylistAdd className="mr-3 text-2xl" />
                  </button>
                  <button onClick={() => onDeleteSong(index)}>
                    <MdDelete className="mr-3 text-2xl" />
                  </button>
                  <button>
                    <MdShare className="mr-3 text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserSongList;
