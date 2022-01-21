import { useSelector } from "react-redux";
import {
  addNewSongs,
  selectActiveSong,
  selectIsPlaying,
  setIsPlaying,
} from "../../features/music-player/musicPlayerSlice";
import PortalContainer from "../portal/PortalContainer";
import { useEffect, useRef, useState } from "react";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { addOneSong } from "../../features/music-player/musicPlayerSlice";
import { selectUser } from "../../features/user/userSlice";
import { toggleLoginModal } from "../../features/modals/modalSlice";
import Song from "../listitems/Song";
import { db } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { client } from "../../sanityClient";
import { toast } from "react-toastify";

function SongList({ songs, toggleMenu, dispatch }) {
  console.log("Song list render");
  const activeSong = useSelector(selectActiveSong);
  const isPlaying = useSelector(selectIsPlaying);
  const user = useSelector(selectUser);

  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);
  const [likedSong, setLikedSong] = useState([]);
  const isUpdateRef = useRef(false);

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

  const playSong = (indexSong, songId) => {
    if (activeSong !== null && songId === activeSong._id) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(addNewSongs({ songs, indexSong }));
      dispatch(setIsPlaying(true));
    }
  };

  const isSongLiked = (songId) => {
    if (likedSong) {
      return likedSong.includes(songId);
    }
    return false;
  };

  const likeSong = async (songId) => {
    if (!user) return dispatch(toggleLoginModal());
    if (isUpdateRef.current) return;

    isUpdateRef.current = true;

    const likedSongTmp = [...likedSong];
    const isLiked = isSongLiked(songId);

    if (!isLiked) {
      likedSongTmp.push(songId);
    } else {
      const deletedIndex = likedSongTmp.indexOf(songId);
      likedSongTmp.splice(deletedIndex, 1);
    }
    try {
      const message = isLiked ? "Removed from favorite" : "Added to favorite";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { likedSong: likedSongTmp }, { merge: true });
      isLiked
        ? await client.patch(songId).dec({ likes: 1 }).commit()
        : await client.patch(songId).inc({ likes: 1 }).commit();

      setLikedSong(likedSongTmp);
      toast(message);
      isUpdateRef.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setLikedSong(user.likedSong);
    }
  }, [user]);

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
            isSongLiked={isSongLiked}
            likeSong={likeSong}
          />
        ))}
      </div>
    </div>
  );
}

export default SongList;
