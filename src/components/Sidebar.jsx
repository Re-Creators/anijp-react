import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdLibraryMusic, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectLikedPlaylist, selectUser } from "../features/user/userSlice";
import { getLikedPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import { selectUserPlaylist } from "../features/user-playlist/userPlaylistSlice";
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

  return (
    <nav className="md:w-sidebar-md bg-primary fixed left-0 z-20 hidden h-screen px-5 text-white shadow-2xl md:block lg:w-1/4 xl:w-[18%]">
      <Link to="/">
        <img
          src="/logo_anijp.svg"
          alt="AniJP Logo"
          className="mx-auto mt-8 w-1/2"
        />
      </Link>
      <div className="mt-10">
        <ul className="grid grid-flow-row gap-y-8">
          <li className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-active" : "nav")}
            >
              <AiFillHome className="text-2xl" />
              <span className="text-md ml-5">Home</span>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? "nav-active" : "nav")}
            >
              <AiOutlineSearch className="text-2xl" />
              <span className="text-md ml-5">Search</span>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "nav-active" : "nav")}
            >
              <MdLibraryMusic className="text-2xl" />
              <span className="text-md ml-5">Collection</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="divider border-primary-300 mt-10 border-t"></div>
      <div className="mt-5">
        <ul className="hide-scrollbar mt-1 h-[20rem] ">
          <Link
            to="/favorite"
            className="relative flex flex-row items-center"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                return dispatch(toggleLoginModal());
              }
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-red-500">
              <MdFavorite className="text-xl" />
            </div>
            <span className="line-clamp-2 ml-3 w-32 text-sm text-gray-300 hover:text-white">
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
                <div className="h-8 w-8">
                  <img src={playlist.cover} alt="" className="h-full w-full" />
                </div>
                <span className="clamp-2 ml-3 w-32 text-sm text-gray-300 hover:text-white">
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
                <div className="h-8 w-8">
                  <img src={playlist.cover} alt="" className="h-full w-full" />
                </div>
                <span className="clamp-2 ml-3 w-32 text-sm text-gray-300 hover:text-white">
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
