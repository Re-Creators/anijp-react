import React from "react";
import {
  MdPlayCircleFilled,
  MdOutlineFavoriteBorder,
  MdShare,
  MdOutlineMoreHoriz,
} from "react-icons/md";

function SongList() {
  return (
    <div classNameName="flex flex-col">
      <div className="grid grid-cols-playlist gap-8 text-gray-400 px-5 md:text-sm lg:text-base">
        <div className="place-self-center">
          <span>#</span>
        </div>
        <div>Song</div>
        <div>Likes</div>
        <div>Duration</div>
        <div>Options</div>
      </div>
      <div className="divider border-t-2 border-primary-300 mt-3 mx-5"></div>
      <div className="flex flex-col mt-3">
        <div className="grid grid-cols-playlist items-center gap-8 py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm group mb-5 md:text-sm lg:text-lg">
          <div className="flex w-10 ">
            <div className="block group-hover:hidden text-sm ml-3">1</div>
            <button className="hidden group-hover:block">
              <MdPlayCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
            </button>
          </div>
          <div className="text-sm my-1">
            <h1 className="font-semibold">Kataomoi</h1>
            <span className="text-xs text-description">Aimer</span>
          </div>
          <div className="flex flex-row items-center">
            <MdOutlineFavoriteBorder className="md:text-sm lg:text-xl" />
            <span className="ml-2 text-sm">2</span>
          </div>
          <div className="text-sm">05:00</div>
          <div className="flex flex-row">
            <button>
              <MdOutlineFavoriteBorder
                className="mr-2 md:text-lg lg:text-xl"
                title="Favorite"
              />
            </button>
            <button>
              <MdShare className=" mr-2 md:text-lg lg:text-xl" title="Share" />{" "}
            </button>
            <button
              className="hidden group-hover:block md:text-lg lg:text-xl"
              title="More option"
            >
              <MdOutlineMoreHoriz className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongList;
