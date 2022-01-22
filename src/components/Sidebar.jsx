import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdLibraryMusic, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLikedPlaylist,
  selectUser,
  set,
} from "../features/user/userSlice";
import { getLikedPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import {
  getUserPlaylist,
  selectUserPlaylist,
} from "../features/user-playlist/userPlaylistSlice";
import { toggleLoginModal } from "../features/modals/modalSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const likedPlaylistIds = useSelector(selectLikedPlaylist);
  const user = useSelector(selectUser);
  const userPlaylist = useSelector(selectUserPlaylist);
  const [likedPlaylist, setLikedPlaylist] = useState([]);

  useEffect(() => {
    if (likedPlaylistIds.length > 0 && user) {
      const query = getLikedPlaylist;
      client.fetch(query, { listId: likedPlaylistIds }).then((data) => {
        setLikedPlaylist(data);
      });
    }
  }, [likedPlaylistIds, user]);

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylist(user.uid));
    }
  }, [user, dispatch]);

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
        <ul className="mt-1 hide-scrollbar h-[20rem] ">
          <Link
            to="/favorite"
            className="flex flex-row items-center relative"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                return dispatch(toggleLoginModal());
              }
            }}
          >
            <div className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-sm">
              <MdFavorite className="text-xl" />
            </div>
            <span className="line-clamp-2 text-gray-300 text-sm hover:text-white w-32 ml-3">
              Favorite Songs
            </span>
          </Link>
          {/* Liked Playlist */}
          {likedPlaylist.map((playlist) => (
            <li key={playlist._id} className="mt-3">
              <Link
                to={`/playlist/${playlist._id}`}
                className="flex flex-row items-center"
              >
                <div className="w-8 h-8">
                  <img src={playlist.cover} alt="" className="w-full h-full" />
                </div>
                <span className="clamp-2 text-gray-300 text-sm ml-3 hover:text-white w-32">
                  {playlist.name}
                </span>
              </Link>
            </li>
          ))}

          {/* User Playlist */}
          {userPlaylist.slice(0, 5).map((playlist) => (
            <li key={playlist.id} className="mt-3">
              <Link
                to={`/myplaylist/${playlist.id}`}
                className="flex flex-row items-center"
              >
                <div className="w-8 h-8">
                  <img src={playlist.cover} alt="" className="w-full h-full" />
                </div>
                <span className="clamp-2 text-gray-300 text-sm ml-3 hover:text-white w-32">
                  {playlist.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
