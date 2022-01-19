import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdOutlineMoreHoriz,
  MdDelete,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectActiveSong,
  selectIsPlaying,
} from "../../features/music-player/musicPlayerSlice";
import BarAnimation from "../UI/BarAnimation";

function UserSongList({ songs, onPlayAll, onSetPlaying }) {
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
      <div>
        <div className="grid grid-cols-myplaylist gap-8 text-gray-400 px-5">
          <div className="place-self-center">
            <span>#</span>
          </div>
          <div>Song</div>
          <div>Duration</div>
          <div></div>
        </div>
        <div className="divider border-t-2 border-primary-300 mt-5 mx-5"></div>
      </div>

      {songs.length <= 0 ? (
        <div className="text-center text-xl mt-5">
          <h1>Empty songs in this playlist</h1>
        </div>
      ) : (
        <div className="flex flex-col">
          {songs.map((song, index) => (
            <div
              className="grid grid-cols-myplaylist items-center gap-8 py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm group"
              key={song._id}
            >
              <div className="w-10">
                {(activeSong?._id !== song._id || !isPlaying) && (
                  <div className="block group-hover:hidden text-sm ml-3">
                    {index + 1}
                  </div>
                )}

                {activeSong?._id === song._id && isPlaying && <BarAnimation />}
                <button
                  className="hidden group-hover:block"
                  onClick={() => playSong(index, song._id)}
                >
                  {isPlaying && activeSong._id === song._id ? (
                    <MdPauseCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
                  ) : (
                    <MdPlayCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
                  )}
                </button>
              </div>
              <div className="text-sm my-1">
                <h1 className="font-semibold">{song.title}</h1>
                <span className="text-xs text-description">{song.artist}</span>
              </div>
              <div className="ml-2">{song.duration}</div>
              <div className="flex flex-row">
                <button>
                  <MdPlaylistAdd className="text-2xl mr-3" />
                </button>
                <button>
                  <MdDelete className="text-2xl mr-3" />
                </button>
                <button>
                  <MdShare className="text-2xl mr-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSongList;
