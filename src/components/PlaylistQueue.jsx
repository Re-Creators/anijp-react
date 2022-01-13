import {
  MdKeyboardArrowDown,
  MdDelete,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from "react-icons/md";

function PlaylistQueue() {
  return (
    <div class="fixed z-50 md:z-40 w-full h-4/6 bottom-0 bg-primary-400 py-2 md:pb-48">
      <button class="absolute right-5 top-3">
        <MdKeyboardArrowDown class="text-gray-400 hover:text-white text-5xl" />
      </button>
      {/* <span class="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-white text-2xl" >No playlist added</span> */}
      <div class="w-4/5 mx-auto mt-14 h-full ">
        <div class="text-white flex flex-row justify-between">
          <h1 class="text-xl font-semibold">Playlist (5 - Song & Albums)</h1>
          <button class="flex item-center bg-secondary px-3 py-2 rounded-md">
            <MdDelete class="mr-2 text-xl" />
            <span>Clear List</span>
          </button>
        </div>
        <div class="mt-5 h-5/6 hide-scrollbar">
          <div class="flex flex-row items-center text-white py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm cursor-pointer group">
            <div class="flex justify-center items-center w-10">
              <div class="block group-hover:hidden">1</div>
              <button class="hidden group-hover:block">
                <MdPlayCircleFilled class=" text-4xl mr-3" />
              </button>
            </div>
            <div class="ml-10">
              <h1>Kizuna</h1>
              <span class="text-sm text-gray-400">Aimer</span>
            </div>
            <button class="ml-auto">
              <MdDelete class="text-gray-400 hover:text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistQueue;
