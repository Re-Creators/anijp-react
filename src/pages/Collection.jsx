import { MdAdd, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";

function Collection() {
  return (
    <div className="w-full md:w-view-md lg:w-view h-screen p-5 md:p-10 text-white md:mt-10 overflow-y-auto pb-48">
      <h1 className="font-bold text-2xl md:text-4xl">My Playlist</h1>
      <div className="flex flex-row flex-wrap mt-8">
        {/* New Playlist */}
        <div className="mr-8 flex flex-col items-center cursor-pointer">
          <div className="w-40 h-40 md:w-52 md:h-52 p-5 border-dashed border-2 border-gray-400 mb-3">
            <img
              src="/images/new-playlist.png"
              alt="New Playlist"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-row">
            <MdAdd />
            <span className="ml-3">New Playlist</span>
          </div>
        </div>
        {/* Users Playlist  */}
        <div className="mr-5 md:mr-8 flex flex-col items-center mb-5">
          <Link
            to="/"
            className="relative block w-40 h-40 md:w-52 md:h-52  overflow-y-hidden mb-3 group"
          >
            <img
              src="/sample/images/snk.jpg"
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
            <div className="hidden md:blovk transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
              <MdPlayCircleFilled className="text-4xl absolute right-3 bottom-3" />
            </div>
          </Link>
          <div className="text-semibold w-full md:w-52">
            <span className="line-clamp-2">Aimer Best Collection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
