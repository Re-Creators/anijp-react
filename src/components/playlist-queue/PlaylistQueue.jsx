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
  clearSongs,
  removeOneSong,
} from "../../features/music-player/musicPlayerSlice";
import BarAnimation from "../UI/BarAnimation";

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
    <div className="absolute inset-x-0 bottom-[50px] z-40 h-[450px] bg-primary-400  py-2 md:z-30 md:pb-48">
      <button className="absolute right-5 top-3" onClick={onClose}>
        <MdKeyboardArrowDown className="text-5xl text-gray-400 hover:text-white" />
      </button>

      {!songs.length && (
        <span className="absolute left-1/2 top-1/4 -translate-x-1/2 transform text-2xl text-white">
          No playlist added
        </span>
      )}

      <div className="mx-auto mt-14 h-full w-4/5 ">
        <div className="flex flex-row justify-between text-white">
          <h1 className="text-xl font-semibold">
            Playlist ({songs.length} - Song & Albums)
          </h1>
          <button
            className="item-center flex rounded-md bg-secondary px-3 py-2"
            onClick={() => dispatch(clearSongs())}
          >
            <MdDelete className="mr-2 text-xl" />
            <span>Clear List</span>
          </button>
        </div>
        <div className="hide-scrollbar mt-5 h-full">
          {songs.map((song, index) => (
            <div
              className={`${activeBackground(
                song._id
              )} group mb-1 flex cursor-pointer flex-row items-center rounded-sm py-3 px-5 text-white transition duration-200 hover:bg-list-hover`}
              key={song._id}
            >
              <div className="flex w-10 items-center justify-center">
                {(activeSong?._id !== song._id || !isPlaying) && (
                  <div className="mr-3 block text-sm group-hover:hidden">
                    {index + 1}
                  </div>
                )}

                {activeSong?._id === song._id && isPlaying && <BarAnimation />}

                <button
                  className="hidden group-hover:block"
                  onClick={() => onPlay(song)}
                >
                  {isPlaying && activeSong?._id === song._id ? (
                    <MdPauseCircleFilled className="mr-3 md:text-3xl lg:text-3xl" />
                  ) : (
                    <MdPlayCircleFilled className="mr-3 md:text-3xl lg:text-3xl" />
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
                <MdDelete className="text-2xl text-gray-400 hover:text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistQueue;
