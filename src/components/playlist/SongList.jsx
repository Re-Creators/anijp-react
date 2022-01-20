import { useSelector } from "react-redux";
import {
  selectActiveSong,
  selectIsPlaying,
} from "../../features/music-player/musicPlayerSlice";
import PortalContainer from "../portal/PortalContainer";
import { useState } from "react";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { useDispatch } from "react-redux";
import { addOneSong } from "../../features/music-player/musicPlayerSlice";
import { selectUser } from "../../features/user/userSlice";
import { toggleLoginModal } from "../../features/modals/modalSlice";
import Song from "../listitems/Song";

function SongList({ songs, onPlayAll, onSetPlaying, toggleMenu }) {
  console.log("Song list render");
  const dispatch = useDispatch();
  const activeSong = useSelector(selectActiveSong);
  const isPlaying = useSelector(selectIsPlaying);
  const user = useSelector(selectUser);

  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);

  const onAddToQueue = () => {
    dispatch(addOneSong(selectedSong));
  };

  const onShowModal = () => {
    if (!user) return dispatch(toggleLoginModal());
    setShowModal(true);
  };

  const onCloseModal = () => {
    if (showChildModal) {
      setShowChildModal(false);
      return;
    }

    setShowModal(false);
  };

  const playSong = (index, songId) => {
    if (activeSong !== null && songId === activeSong._id) {
      onSetPlaying(!isPlaying);
    } else {
      onPlayAll(index);
    }
  };

  const likeSong = async () => {
    if (!user) return dispatch(toggleLoginModal());
  };

  if (songs.length <= 0) return null;
  return (
    <div className="flex flex-col">
      <PortalContainer isShow={showModal} onClose={onCloseModal} zIndex={50}>
        <AddToPlaylistModal
          user={user}
          showChildModal={showChildModal}
          toggleChildModal={() => setShowChildModal(!showChildModal)}
          closeModal={onCloseModal}
          selectedSong={selectedSong}
        />
      </PortalContainer>

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
        {songs.map((song, index) => (
          <Song
            key={song._id}
            isPlaying={isPlaying}
            song={song}
            songIndex={index}
            activeSong={activeSong}
            playSong={playSong}
            toggleMenu={toggleMenu}
            onShowModal={onShowModal}
            onAddToQueue={onAddToQueue}
            setSelectedSong={setSelectedSong}
          />
          // <div
          //   className="grid grid-cols-playlist items-center gap-8 py-3 px-5 transition duration-200 hover:bg-list-hover rounded-sm group mb-5 md:text-sm lg:text-lg"
          //   key={song._id}
          // >
          //   <div className="flex w-10 ">
          //     {(activeSong?._id !== song._id || !isPlaying) && (
          //       <div className="block group-hover:hidden text-sm ml-3">
          //         {index + 1}
          //       </div>
          //     )}

          //     {activeSong?._id === song._id && isPlaying && <BarAnimation />}

          //     <button
          //       className="hidden group-hover:block"
          //       onClick={() => playSong(index, song._id)}
          //     >
          //       {isPlaying && activeSong._id === song._id ? (
          //         <MdPauseCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
          //       ) : (
          //         <MdPlayCircleFilled className="md:text-3xl lg:text-3xl mr-3" />
          //       )}
          //     </button>
          //   </div>
          //   <div className="text-sm my-1">
          //     <h1 className="font-semibold">{song.title}</h1>
          //     <span className="text-xs text-description">{song.artist}</span>
          //   </div>
          //   <div className="flex flex-row items-center">
          //     <MdFavorite className="md:text-sm lg:text-xl" />
          //     <span className="ml-2 text-sm">{song.likes}</span>
          //   </div>
          //   <div className="text-sm">{song.duration}</div>
          //   <div className="flex flex-row relative">
          //     <button>
          //       <MdOutlineFavoriteBorder
          //         className="mr-2 md:text-lg lg:text-xl"
          //         title="Favorite"
          //       />
          //     </button>
          //     <button>
          //       <MdShare
          //         className=" mr-2 md:text-lg lg:text-xl"
          //         title="Share"
          //       />
          //     </button>
          //     <TippyMenu
          //       toggleMenu={toggleMenu}
          //       onShowModal={onShowModal}
          //       onAddToQueue={onAddToQueue}
          //     >
          //       <button
          //         className="hidden group-hover:block md:text-lg lg:text-xl"
          //         title="More option"
          //         onClick={() => setSelectedSong(song)}
          //       >
          //         <MdOutlineMoreHoriz className="text-gray-400" />
          //       </button>
          //     </TippyMenu>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
