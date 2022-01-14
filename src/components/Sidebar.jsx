import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdLibraryMusic, MdFavorite } from "react-icons/md";

function Sidebar() {
  return (
    <nav className="fixed z-20 left-0 px-5 hidden md:block md:w-sidebar-md lg:w-1/4 xl:w-[18%] h-screen bg-primary text-white shadow-2xl">
      <Link to="/">
        <img
          src="/logo_anijp.svg"
          alt="AniJP Logo"
          className="w-1/2 mx-auto mt-8"
        />
      </Link>
      <div className="mt-10">
        <ul className="grid grid-flow-row gap-y-8">
          <li className="menu-item">
            <Link
              to="/"
              className="flex flex-row items-center transition duration-150 hover:text-link-active"
            >
              <AiFillHome className="text-2xl" />
              <span className="text-md ml-5">Home</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/"
              className="flex flex-row items-center transition duration-150 hover:text-link-active"
            >
              <AiOutlineSearch className="text-2xl" />
              <span className="text-md ml-5">Explore</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/collection"
              className="flex flex-row items-center transition duration-150 hover:text-link-active"
            >
              <MdLibraryMusic className="text-2xl" />
              <span className="text-md ml-5">Collection</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="divider border-t border-primary-300 mt-10"></div>
      <div className="mt-5">
        <button className="flex flex-row items-center relative">
          <div className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-sm">
            <MdFavorite className="text-xl" />
          </div>
          <span className="line-clamp-2 text-gray-300 text-sm hover:text-white w-32 absolute left-5">
            Liked Songs
          </span>
        </button>
        <ul className="mt-5">
          <li>
            {/* <Link to="/" className="flex flex-row items-center">
              <div class="w-8 h-8">
                <img src="playlist.cover" alt="aimer" class="w-full h-full"/>
              </div>
              <span class="clamp-2 text-gray-300 text-sm ml-3 hover:text-white w-32">Chill Music</span>
            </Link> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
