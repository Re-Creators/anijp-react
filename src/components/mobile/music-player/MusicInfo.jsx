import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  MdExpandMore,
  MdFavorite,
  MdFavoriteBorder,
  MdList,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdShare,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { toggleLoginModal } from "../../../features/modals/modalSlice";
import { setIsPlaying } from "../../../features/music-player/musicPlayerSlice";
import {
  selectLikedSongs,
  selectUser,
  updateLikedSongs,
} from "../../../features/user/userSlice";
import { db } from "../../../firebase-config";
import { client } from "../../../sanityClient";
import { getDurationString } from "../../../utils";
import AddToPlaylistModal from "../../modals/AddToPlaylistModal";
import ProggressBar from "../../music-player/ProggressBar";
import PortalContainer from "../../portal/PortalContainer";
import PlaylistQueueMobile from "../PlaylistQueueMobile";

function MusicInfo({
  hide,
  audioRef,
  isPlaying,
  activeSong,
  dispatch,
  changeSongHandler,
}) {
  console.log("RENDE");
  const user = useSelector(selectUser);
  const likedSongs = useSelector(selectLikedSongs);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  let percent = isNaN(timeProgress / duration)
    ? 0
    : (timeProgress / duration) * 100;

  const onChangeTime = (time) => {
    audioRef.current.currentTime = time;
  };

  const onProgressMove = (time) => {
    setTimeProgress(time);
  };

  const onTimeUpdate = useCallback((e) => {
    const { currentTime } = e.srcElement;
    setTimeProgress(currentTime);
  }, []);

  const addToPlaylistHandler = async () => {
    if (!user) return dispatch(toggleLoginModal());
    setShowModal(true);
  };

  const likeHandler = async () => {
    if (!user) return dispatch(toggleLoginModal());

    const likedSongsTmp = [...likedSongs];

    if (!isLiked) {
      likedSongsTmp.push(activeSong._id);
    } else {
      const deletedIndex = likedSongsTmp.indexOf(activeSong._id);
      likedSongsTmp.splice(deletedIndex, 1);
    }
    try {
      const message = isLiked ? "Removed from favorite" : "Added to favorite";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { likedSong: likedSongsTmp }, { merge: true });
      isLiked
        ? await client.patch(activeSong._id).dec({ likes: 1 }).commit()
        : await client.patch(activeSong._id).inc({ likes: 1 }).commit();

      dispatch(updateLikedSongs(likedSongsTmp));
      toast(message);
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseModal = () => {
    if (showChildModal) {
      setShowChildModal(false);
      return;
    }

    setShowModal(false);
  };

  useEffect(() => {
    setDuration(audioRef.current.duration);
    const audioRefValue = audioRef.current;

    audioRefValue.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioRefValue.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef, onTimeUpdate]);

  useEffect(() => {
    setIsLiked(likedSongs.includes(activeSong._id));
  }, [likedSongs, activeSong]);

  return (
    <div className="fixed z-40 inset-0 bg-music-info p-3">
      <PortalContainer isShow={showModal} onClose={onCloseModal} zIndex={50}>
        <AddToPlaylistModal
          user={user}
          showChildModal={showChildModal}
          toggleChildModal={() => setShowChildModal(!showChildModal)}
          closeModal={onCloseModal}
          selectedSong={activeSong}
          dispatch={dispatch}
        />
      </PortalContainer>

      <button onClick={hide}>
        <MdExpandMore className="text-4xl text-white" />
      </button>
      <img
        src={activeSong.image}
        alt=""
        className="w-4/5 h-[300px] mx-auto rounded-md object-cover"
      />
      <div className="text-white mt-5 text-2xl text-center">
        <h1>{activeSong.title} </h1>
        <h2 className="text-lg text-gray-300"> {activeSong.artist} </h2>
      </div>
      <div className="absolute bottom-10 w-full  px-3">
        <div className="w-full flex flex-row justify-between text-white">
          <button onClick={likeHandler}>
            {isLiked ? (
              <MdFavorite className="text-4xl" />
            ) : (
              <MdFavoriteBorder className="text-4xl" />
            )}
          </button>
          <div className="flex flex-row">
            <button onClick={() => changeSongHandler(-1)}>
              <MdSkipPrevious className="text-4xl" />
            </button>
            <button
              className="mx-3"
              onClick={() => dispatch(setIsPlaying(!isPlaying))}
            >
              {isPlaying ? (
                <MdPauseCircleFilled className="text-5xl" />
              ) : (
                <MdPlayCircleFilled className="text-5xl" />
              )}
            </button>
            <button onClick={() => changeSongHandler(1)}>
              <MdSkipNext className="text-4xl" />
            </button>
          </div>
          <button className="mr-5" onClick={addToPlaylistHandler}>
            <MdPlaylistAdd className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-row text-white text-xs items-center mr-5 mt-5 justify-between">
          <span className="w-10">{getDurationString(timeProgress)}</span>
          <ProggressBar
            percent={percent}
            duration={duration}
            onChangeTime={onChangeTime}
            onProgressMove={onProgressMove}
            progressBarColor="bg-white"
            barColor="bg-primary"
            showPoint
            pointColor="bg-white"
          />

          <span className="w-10">{activeSong.duration}</span>
        </div>
        <div className="flex flex-row justify-between text-white mt-5">
          <button className="mr-5" onClick={() => setShowQueue(true)}>
            <MdList className="text-3xl" />
          </button>
          <button className="mr-5">
            <MdShare className="text-3xl" />
          </button>
        </div>
      </div>

      <CSSTransition
        in={showQueue}
        timeout={400}
        classNames="slideUpInfo"
        unmountOnExit
      >
        <PlaylistQueueMobile
          hide={() => setShowQueue(false)}
          dispatch={dispatch}
        />
      </CSSTransition>
    </div>
  );
}

export default MusicInfo;
