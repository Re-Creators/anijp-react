import { useState, useEffect } from "react";
import { MdAdd, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import NewPlaylistModal from "../components/modals/NewPlaylistModal";
import PortalContainer from "../components/portal/PortalContainer";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/modals/modalSlice";
import { useUserPlaylist } from "../hooks/useUserPlaylist";

function Collection() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(selectUser);
  const { userPlaylist, fetchData } = useUserPlaylist(user);

  const newPlaylistHandler = () => {
    if (!user) return dispatch(toggleModal());

    setShowModal(true);
  };
  return (
    <div className="pl-10 mt-20 text-white pb-96 h-screen hide-scrollbar">
      <h1 className="font-bold text-2xl md:text-4xl">My Collection</h1>
      <div className="flex flex-row flex-wrap mt-8">
        {/* New Playlist */}
        <div className="mr-8 flex flex-col items-center cursor-pointer">
          <div
            className="w-40 h-40 md:w-52 md:h-52 p-5 border-dashed border-2 border-gray-400 mb-3"
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
            <span className="ml-3">New Playlist</span>
          </div>
        </div>
        {/* Users Playlist  */}
        {userPlaylist.map((playlist) => (
          <div
            className="mr-5 md:mr-8 flex flex-col items-center mb-5"
            key={playlist.id}
          >
            <Link
              to="/"
              className="relative block w-40 h-40 md:w-52 md:h-52  overflow-y-hidden mb-3 group"
            >
              <img
                src={playlist.cover}
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="hidden md:block transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                <MdPlayCircleFilled className="text-4xl absolute right-3 bottom-3" />
              </div>
            </Link>
            <div className="text-semibold w-full md:w-52">
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
          fetchData={fetchData}
        />
      </PortalContainer>
    </div>
  );
}

export default Collection;
