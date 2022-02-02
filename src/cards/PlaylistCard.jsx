import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";

function PlaylistCard({ id, coverImage, name, songs, playHandler }) {
  return (
    <div className="mb-5 w-1/3 px-[3px] md:mr-5 md:w-40 md:px-0 lg:w-48">
      <Link
        to={`/playlist/${id}`}
        className="group bg-primary-100 relative mb-2 block h-[130px] overflow-hidden overflow-y-hidden rounded-lg shadow-md md:h-52 lg:h-60"
      >
        <img src={coverImage} alt="" className="h-full w-full object-cover" />
        <div className="bg-card-hover absolute bottom-0 h-32 w-full translate-y-48 transform transition duration-300 group-hover:translate-y-0">
          <button onClick={(e) => playHandler(e, songs)}>
            <MdPlayCircleFilled className="material-icons absolute right-3 bottom-3 text-4xl" />
          </button>
        </div>
      </Link>
      <span className="line-clamp-2 overflow-x-hidden text-xs md:w-40 md:text-sm lg:w-48 lg:text-base">
        {name}
      </span>
    </div>
  );
}

export default PlaylistCard;
