import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdOutlineFavoriteBorder,
  MdFavorite,
  MdShare,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import BarAnimation from "../UI/BarAnimation";
import TippyMenu from "../tippy/TippyMenu";

function Song(props) {
  const { song, songIndex, activeSong, isPlaying } = props;
  const {
    playSong,
    toggleMenu,
    onShowModal,
    onAddToQueue,
    setSelectedSong,
    isSongLiked,
    likeSong,
  } = props;

  return (
    <div className="group mb-5 grid grid-cols-playlist items-center gap-8 rounded-sm py-3 px-5 transition duration-200 hover:bg-list-hover md:text-sm lg:text-lg">
      <div className="flex w-10 ">
        {(activeSong?._id !== song._id || !isPlaying) && (
          <div className="ml-3 block text-sm group-hover:hidden">
            {songIndex + 1}
          </div>
        )}

        {activeSong?._id === song._id && isPlaying && <BarAnimation />}

        <button
          className="hidden group-hover:block"
          onClick={() => playSong(songIndex, song._id)}
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
        <span className="text-xs text-description">{song.artist}</span>
      </div>
      <div className="flex flex-row items-center">
        <MdFavorite className="md:text-sm lg:text-xl" />
        <span className="ml-2 text-sm">{song.likes}</span>
      </div>
      <div className="text-sm">{song.duration}</div>
      <div className="relative flex flex-row">
        <button onClick={() => likeSong(song._id)}>
          {isSongLiked(song._id) ? (
            <MdFavorite className="mr-2 md:text-lg lg:text-xl" />
          ) : (
            <MdOutlineFavoriteBorder
              className="mr-2 md:text-lg lg:text-xl"
              title="Favorite"
            />
          )}
        </button>
        <button>
          <MdShare className=" mr-2 md:text-lg lg:text-xl" title="Share" />
        </button>
        <TippyMenu
          toggleMenu={toggleMenu}
          onShowModal={onShowModal}
          onAddToQueue={onAddToQueue}
        >
          <button
            className="hidden group-hover:block md:text-lg lg:text-xl"
            title="More option"
            onClick={() => setSelectedSong(song)}
          >
            <MdOutlineMoreHoriz className="text-gray-400" />
          </button>
        </TippyMenu>
      </div>
    </div>
  );
}

export default Song;
