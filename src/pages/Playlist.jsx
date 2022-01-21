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
import { getOnePlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { toggleLoginModal } from "../features/modals/modalSlice";
import { toast } from "react-toastify";

function Playlist() {
  console.log("render Playlist");
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(selectUser);
  const [isLiked, setIsLiked] = useState(false);
  const [playlistDetail, setPlayListDetail] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [likeCount, setLikeCount] = useState(0);

  const isUpdateRef = useRef(false);

  const like = async () => {
    if (!user) return dispatch(toggleLoginModal());
    if (isUpdateRef.current) return;

    isUpdateRef.current = true;
    let likedPlaylist = [...user.likedPlaylist];

    if (!isLiked) {
      likedPlaylist.push(id);
    } else {
      const deletedIndex = likedPlaylist.indexOf(id);
      likedPlaylist.splice(deletedIndex, 1);
    }

    try {
      const message = isLiked
        ? "Removed from collection"
        : "Added to collection";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { likedPlaylist }, { merge: true });

      setIsLiked(!isLiked);
      toast(message);

      let response = isLiked
        ? await client.patch(id).dec({ likes: 1 }).commit()
        : await client.patch(id).inc({ likes: 1 }).commit();
      setLikeCount(response?.likes);

      isUpdateRef.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const query = getOnePlaylist(id);
    client.fetch(query).then((data) => {
      setPlayListDetail(data[0]);
      setLikeCount(data[0].likes);
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      const likedPlaylist = user.likedPlaylist;
      setIsLiked(likedPlaylist.includes(id));
    }
  }, [user, id, dispatch]);

  if (!playlistDetail) return <p>Loading..</p>;
  return (
    <div
      className={`text-white ${
        showMenu ? "hide-scrollbar" : "overflow-y-hidden"
      }  h-screen`}
    >
      {/* Playlist Details  */}
      <Detail
        songCount={playlistDetail.songs.length}
        playlistName={playlistDetail.name}
        cover={playlistDetail.cover}
        description={playlistDetail.description}
        likeCount={likeCount}
        type="playlist"
      />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen">
        <div className="flex flex-row items-center mb-10">
          <button
            onClick={() => {
              dispatch(
                addNewSongs({ songs: playlistDetail.songs, indexSong: 0 })
              );
              dispatch(setIsPlaying(true));
            }}
          >
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
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
          songs={playlistDetail?.songs}
          onPlayAll={onPlayAll}
          dispatch={dispatch}
          toggleMenu={() => setShowMenu(!showMenu)}
        />
      </div>
    </div>
  );
}

export default Playlist;
