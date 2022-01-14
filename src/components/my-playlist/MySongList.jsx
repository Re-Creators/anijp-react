import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdOutlineMoreHoriz,
  MdDelete,
} from "react-icons/md";

function MySongList({ songs }) {
  return (
    <div class="flex flex-col">
      {/* Song list Header */}
      <div>
        <div class="grid grid-cols-myplaylist gap-8 text-gray-400 px-5">
          <div class="place-self-center">
            <span>#</span>
          </div>
          <div>Song</div>
          <div>Duration</div>
          <div></div>
        </div>
        <div class="divider border-t-2 border-primary-300 mt-5 mx-5"></div>
      </div>

      {songs.length <= 0 ? (
        <div class="text-center text-xl mt-5">
          <h1>Empty songs in this playlist</h1>
        </div>
      ) : (
        <div class="flex flex-col">
          <div class="grid grid-cols-myplaylist items-center gap-8 py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm group">
            <div class="flex justify-center items-center w-10">
              <div class="block group-hover:hidden">1</div>
              {/* <bar-animation v-if="playingSong !== null && playingSong._id === song._id && isPlaying"/> */}
              <button class="hidden group-hover:block">
                <MdPlayCircleFilled class=" text-4xl mr-3" />
              </button>
            </div>
            <div>
              <h1 class="font-semibold">Kizuna</h1>
              <span class="text-xs text-description">Aimer</span>
            </div>
            <div className="ml-2">04:30</div>
            <div class="flex flex-row">
              <button>
                <MdPlaylistAdd class="text-2xl mr-3" />
              </button>
              <button>
                <MdDelete class="text-2xl mr-3" />
              </button>
              <button>
                <MdShare class="text-2xl mr-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MySongList;
