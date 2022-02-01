import { useEffect, useRef, useState } from "react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import Detail from "../components/playlist/Detail";
import SongList from "../components/playlist/SongList";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "..//features/music-player/musicPlayerSlice";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectLikedPlaylist,
  selectUser,
  updateLikedPlaylist,
} from "../features/user/userSlice";
import { toggleLoginModal } from "../features/modals/modalSlice";
import { toast } from "react-toastify";
import usePlaylistDetail from "../hooks/usePlaylistDetail";
import useUpdatePlaylistLike from "../hooks/useUpdatePlaylistLike";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Playlist() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, status } = usePlaylistDetail(id);
  const { mutate } = useUpdatePlaylistLike();
  const { setTitle } = useDocumentTitle();
  const user = useSelector(selectUser);
  const likedPlaylist = useSelector(selectLikedPlaylist);
  const [isLiked, setIsLiked] = useState(false);

  const [showMenu, setShowMenu] = useState(true);
  const isUpdateRef = useRef(false);

  const like = async () => {
    if (!user) return dispatch(toggleLoginModal());
    if (isUpdateRef.current) return;

    isUpdateRef.current = true;
    let likedPlaylistTmp = [...likedPlaylist];

    if (!isLiked) {
      likedPlaylistTmp.push(id);
    } else {
      const deletedIndex = likedPlaylistTmp.indexOf(id);
      likedPlaylistTmp.splice(deletedIndex, 1);
    }

    try {
      const message = isLiked
        ? "Removed from collection"
        : "Added to collection";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(
        userRef,
        { likedPlaylist: likedPlaylistTmp },
        { merge: true }
      );

      dispatch(updateLikedPlaylist(likedPlaylistTmp));
      setIsLiked(!isLiked);
      toast(message);

      mutate({ isLiked, id });

      isUpdateRef.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (likedPlaylist) {
      setIsLiked(likedPlaylist.includes(id));
    }
  }, [likedPlaylist, id, dispatch]);

  useEffect(() => {
    if (data) {
      setTitle(`${data.name} | AniJP Playlist`);
    }
  }, [data, setTitle]);

  if (status === "loading") return null;
  return (
    <div
      className={`text-white ${
        showMenu ? "hide-scrollbar" : "overflow-y-hidden"
      }  h-screen`}
    >
      {/* Playlist Details  */}
      <Detail
        songCount={data.songs.length}
        playlistName={data.name}
        cover={data.cover}
        description={data.description}
        likeCount={data.likes}
        type="playlist"
      />
      <div className="bg-playlist-container min-h-screen w-full py-5 pb-80 md:px-5 lg:px-10">
        <div className="mb-10 flex flex-row items-center">
          <button
            onClick={() => {
              dispatch(addNewSongs({ songs: data.songs, indexSong: 0 }));
              dispatch(setIsPlaying(true));
            }}
          >
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
            >
              <circle cx="40" cy="40" r="25" fill="white" />
              <path
                d="M40 6.66667C21.6 6.66667 6.66669 21.6 6.66669 40C6.66669 58.4 21.6 73.3333 40 73.3333C58.4 73.3333 73.3334 58.4 73.3334 40C73.3334 21.6 58.4 6.66667 40 6.66667ZM33.3334 55V25L53.3334 40L33.3334 55Z"
                fill="#2C62BF"
              />
            </svg>
          </button>
          <button className="ml-3 mt-2" onClick={() => like()}>
            {isLiked ? (
              <MdFavorite className="text-4xl" />
            ) : (
              <MdOutlineFavoriteBorder className="text-4xl" />
            )}
          </button>
        </div>

        <SongList
          songs={data.songs}
          dispatch={dispatch}
          toggleMenu={() => setShowMenu(!showMenu)}
        />
      </div>
    </div>
  );
}

export default Playlist;
