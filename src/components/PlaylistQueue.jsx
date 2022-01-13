import {
  MdKeyboardArrowDown,
  MdDelete,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
} from "react-icons/md";

function PlaylistQueue({ onClose }) {
  console.log("Render : PlaylistQueue");

  return (
    <div className="absolute z-40 md:z-30 inset-x-0 bottom-[100px] h-[450px]  bg-primary-400 py-2 md:pb-48">
      <button className="absolute right-5 top-3" onClick={onClose}>
        <MdKeyboardArrowDown className="text-gray-400 hover:text-white text-5xl" />
      </button>
      {/* <span className="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-white text-2xl" >No playlist added</span> */}
      <div className="w-4/5 mx-auto mt-14 h-full ">
        <div className="text-white flex flex-row justify-between">
          <h1 className="text-xl font-semibold">
            Playlist (5 - Song & Albums)
          </h1>
          <button className="flex item-center bg-secondary px-3 py-2 rounded-md">
            <MdDelete className="mr-2 text-xl" />
            <span>Clear List</span>
          </button>
        </div>
        <div className="mt-5 h-5/6 hide-scrollbar">
          <div className="flex flex-row items-center text-white py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm cursor-pointer group">
            <div className="flex justify-center items-center w-10">
              <div className="block group-hover:hidden">1</div>
              <button className="hidden group-hover:block">
                <MdPlayCircleFilled className=" text-4xl mr-3" />
              </button>
            </div>
            <div className="ml-10">
              <h1>Kizuna</h1>
              <span className="text-sm text-gray-400">Aimer</span>
            </div>
            <button className="ml-auto">
              <MdDelete className="text-gray-400 hover:text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistQueue;
