import { useEffect, useState } from "react";
import { MdAdd, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import NewPlaylistModal from "../components/modals/NewPlaylistModal";
import PortalContainer from "../components/portal/PortalContainer";
import { useSelector } from "react-redux";
import { selectLikedPlaylist, selectUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../features/modals/modalSlice";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";
import {
  getUserPlaylist,
  selectUserPlaylist,
} from "../features/user-playlist/userPlaylistSlice";
import useLikedPlaylist from "../hooks/useLikedPlaylist";
import useHelmetTitle from "../hooks/useHelmetTitle";
import { setHelmetTitle } from "../features/helmet-title/helmetTitleSlice";

function Collection() {
  useHelmetTitle("My Collection | AniJP");

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

  useEffect(() => {
    dispatch(setHelmetTitle("My Collection | AniJP"));
  }, [dispatch]);

  return (
    <div className="hide-scrollbar mt-5 px-3 pb-96 text-white md:pl-10">
      <h1 className="text-2xl font-bold md:text-4xl">My Collection</h1>
      <div className="mt-8 flex flex-row flex-wrap">
        {/* New Playlist */}
        <div className="flex w-1/3 cursor-pointer flex-col items-center px-[3px] md:mr-8 md:w-52 md:px-0">
          <div
            className="mb-3 h-[130px] w-full rounded-md border-2 border-dashed border-gray-400 p-3 md:h-52 md:p-5"
            onClick={newPlaylistHandler}
          >
            <img
              src="/images/new-playlist.png"
              alt="New Playlist"
              className="h-full w-full rounded-lg"
            />
          </div>
          <div className="flex flex-row" onClick={newPlaylistHandler}>
            <MdAdd />
            <span className="ml-3 text-xs md:text-sm">New Playlist</span>
          </div>
        </div>
        {/* Liked Playlist */}
        {data.map((playlist) => (
          <div
            className="mb-5 flex w-1/3 flex-col items-center px-[3px] md:mr-8 md:w-52  md:px-0"
            key={playlist._id}
          >
            <Link
              to={`/playlist/${playlist._id}`}
              className="group bg-primary-100 relative mb-3 block  h-[130px] w-full overflow-hidden  rounded-lg md:h-52"
            >
              <img
                src={playlist.cover}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="bg-card-hover absolute bottom-0 hidden h-32 w-full translate-y-48 transform transition duration-300 group-hover:translate-y-0 md:block">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      addNewSongs({ songs: playlist.songs, indexSong: 0 })
                    );
                    dispatch(setIsPlaying(true));
                  }}
                >
                  <MdPlayCircleFilled className="absolute right-3 bottom-3 text-4xl" />
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
            className="mb-5 flex w-1/3 flex-col items-center px-[3px] md:mr-8 md:w-52 md:px-0"
            key={playlist.id}
          >
            <Link
              to={`/myplaylist/${playlist.id}`}
              className="group bg-primary-100 relative mb-3 block h-[130px]   w-full  overflow-hidden rounded-lg md:h-52 md:w-52"
            >
              <img
                src={playlist.cover}
                alt=""
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="bg-card-hover absolute bottom-0 hidden h-32 w-full translate-y-48 transform transition duration-300 group-hover:translate-y-0 md:block">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    playUserPlaylist(playlist);
                  }}
                >
                  <MdPlayCircleFilled className="absolute right-3 bottom-3 text-4xl" />
                </button>
              </div>
            </Link>
            <div className="text-semibold w-full text-xs md:w-52 md:text-sm">
              <span className="line-clamp-2">{playlist.name}</span>
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
