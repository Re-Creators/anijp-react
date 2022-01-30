import { useState, useEffect } from "react";
import { MdAdd, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import NewPlaylistModal from "../components/modals/NewPlaylistModal";
import PortalContainer from "../components/portal/PortalContainer";
import { useSelector } from "react-redux";
import { selectLikedPlaylist, selectUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../features/modals/modalSlice";
import { getLikedPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";
import {
  getUserPlaylist,
  selectUserPlaylist,
} from "../features/user-playlist/userPlaylistSlice";
import useLikedPlaylist from "../hooks/useLikedPlaylist";

function Collection() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const likedPlaylistIds = useSelector(selectLikedPlaylist);
  const userPlaylist = useSelector(selectUserPlaylist);

  const { data } = useLikedPlaylist(likedPlaylistIds, user);
  const [showModal, setShowModal] = useState(false);

  const newPlaylistHandler = () => {
    if (!user) return dispatch(toggleLoginModal());

    setShowModal(true);
  };

  const playUserPlaylist = (playlist) => {
    if (playlist.songs.length > 0) {
      dispatch(addNewSongs({ songs: playlist.songs, indexSong: 0 }));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className="mt-5 px-3 md:pl-10 text-white pb-96 hide-scrollbar">
      <h1 className="font-bold text-2xl md:text-4xl">My Collection</h1>
      <div className="flex flex-row flex-wrap mt-8">
        {/* New Playlist */}
        <div className="w-1/3 px-[3px] md:px-0 md:w-52 md:mr-8 flex flex-col items-center cursor-pointer">
          <div
            className="w-full h-[130px] md:h-52 p-3 md:p-5 border-dashed border-2 border-gray-400 mb-3 rounded-md"
            onClick={newPlaylistHandler}
          >
            <img
              src="/images/new-playlist.png"
              alt="New Playlist"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-row" onClick={newPlaylistHandler}>
            <MdAdd />
            <span className="ml-3 text-xs md:text-sm">New Playlist</span>
          </div>
        </div>
        {/* Liked Playlist */}
        {data &&
          data.map((playlist) => (
            <div
              className="w-1/3 px-[3px] md:px-0 md:mr-8 flex flex-col items-center mb-5  md:w-52"
              key={playlist._id}
            >
              <Link
                to={`/playlist/${playlist._id}`}
                className="relative block w-full h-[130px] md:h-52  overflow-y-hidden mb-3 group"
              >
                <img
                  src={playlist.cover}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="hidden md:block transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        addNewSongs({ songs: playlist.songs, indexSong: 0 })
                      );
                      dispatch(setIsPlaying(true));
                    }}
                  >
                    <MdPlayCircleFilled className="text-4xl absolute right-3 bottom-3" />
                  </button>
                </div>
              </Link>
              <div className="text-semibold w-full text-xs md:text-base">
                <span className="line-clamp-2 capitalize">{playlist.name}</span>
              </div>
            </div>
          ))}

        {/* Users Playlist  */}
        {userPlaylist.map((playlist) => (
          <div
            className="w-1/3 px-[3px] md:px-0 md:w-52 md:mr-8 flex flex-col items-center mb-5"
            key={playlist.id}
          >
            <Link
              to={`/myplaylist/${playlist.id}`}
              className="relative block h-[130px] w-full md:w-52 md:h-52  overflow-y-hidden mb-3 group"
            >
              <img
                src={playlist.cover}
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="hidden md:block transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    playUserPlaylist(playlist);
                  }}
                >
                  <MdPlayCircleFilled className="text-4xl absolute right-3 bottom-3" />
                </button>
              </div>
            </Link>
            <div className="text-semibold w-full md:w-52 text-xs md:text-sm">
              <span className="line-clamp-2 capitalize">{playlist.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PortalContainer
        isShow={showModal}
        timeout={300}
        onClose={() => setShowModal(false)}
        transitionName="fade"
        zIndex={50}
        backgroundColor="rgba(47, 69, 108, 0.83)"
      >
        <NewPlaylistModal
          hideModal={() => setShowModal(false)}
          fetchData={() => dispatch(getUserPlaylist(user.uid))}
        />
      </PortalContainer>
    </div>
  );
}

export default Collection;
