import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdOutlineMoreHoriz,
  MdDelete,
} from "react-icons/md";

function UserSongList({ songs }) {
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
              <div className="flex justify-center items-center w-10">
                <div className="block group-hover:hidden">{index + 1}</div>
                {/* <bar-animation v-if="playingSong !== null && playingSong._id === song._id && isPlaying"/> */}
                <button className="hidden group-hover:block">
                  <MdPlayCircleFilled className=" text-4xl mr-3" />
                </button>
              </div>
              <div className="text-sm">
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
