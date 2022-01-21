import {
  MdKeyboardArrowDown,
  MdDelete,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSongs,
  selectActiveSong,
  selectIsPlaying,
  setIsPlaying,
  changeActiveSong,
  addNewSongs,
  clearSongs,
  removeOneSong,
} from "../features/music-player/musicPlayerSlice";
import BarAnimation from "./UI/BarAnimation";

function PlaylistQueue({ onClose }) {
  const dispatch = useDispatch();

  const activeSong = useSelector(selectActiveSong);
  const songs = useSelector(selectSongs);
  const isPlaying = useSelector(selectIsPlaying);

  const activeBackground = (songId) =>
    songId === activeSong?._id ? "bg-list-hover" : "";

  const onPlay = (song) => {
    if (activeSong?._id === song._id) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(changeActiveSong(song));
    }
  };
  return (
    <div className="absolute z-40 md:z-30 inset-x-0 bottom-[100px] h-[450px]  bg-primary-400 py-2 md:pb-48">
      <button className="absolute right-5 top-3" onClick={onClose}>
        <MdKeyboardArrowDown className="text-gray-400 hover:text-white text-5xl" />
      </button>

      {!songs.length && (
        <span className="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-white text-2xl">
          No playlist added
        </span>
      )}

      <div className="w-4/5 mx-auto mt-14 h-full ">
        <div className="text-white flex flex-row justify-between">
          <h1 className="text-xl font-semibold">
            Playlist ({songs.length} - Song & Albums)
          </h1>
          <button
            className="flex item-center bg-secondary px-3 py-2 rounded-md"
            onClick={() => dispatch(clearSongs())}
          >
            <MdDelete className="mr-2 text-xl" />
            <span>Clear List</span>
          </button>
        </div>
        <div className="mt-5 h-full hide-scrollbar">
          {songs.map((song, index) => (
            <div
              className={`${activeBackground(
                song._id
              )} flex flex-row items-center text-white py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm cursor-pointer group mb-1`}
              key={song._id}
            >
              <div className="flex justify-center items-center w-10">
                {(activeSong?._id !== song._id || !isPlaying) && (
                  <div className="block group-hover:hidden text-sm mr-3">
                    {index + 1}
                  </div>
                )}

                {activeSong?._id === song._id && isPlaying && <BarAnimation />}

                <button
                  className="hidden group-hover:block"
                  onClick={() => onPlay(song)}
                >
                  {isPlaying && activeSong?._id === song._id ? (
                    <MdPauseCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
                  ) : (
                    <MdPlayCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
                  )}
                </button>
              </div>
              <div className="ml-10">
                <h1>{song?.title}</h1>
                <span className="text-sm text-gray-400">{song.artist}</span>
              </div>
              <button
                className="ml-auto"
                onClick={() => dispatch(removeOneSong({ songId: song._id }))}
              >
                <MdDelete className="text-gray-400 hover:text-white text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistQueue;
