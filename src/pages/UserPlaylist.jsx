import { useEffect, useRef, useState } from "react";

import UserPlaylistDetail from "../components/user-playlist/UserPlaylistDetail";
import { MdOutlineMoreHoriz, MdPlaylistAdd, MdDelete } from "react-icons/md";
import UserSongList from "../components/user-playlist/UserSongList";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function UserPlaylist() {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [playlistDetail, setPlaylistDetail] = useState(null);

  const docRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        docRef.current = doc(db, "user_playlists", id);
        const docSnap = await getDoc(docRef.current);
        if (docSnap.exists()) {
          setPlaylistDetail(docSnap.data());
        }
      } catch (err) {
        console.log(err);
      }

      return;
    };

    fetchData();
  }, [id]);

  if (!playlistDetail) return <p>loading..</p>;
  return (
    <div
      className={`text-white ${
        showMenu ? "hide-scrollbar" : "overflow-y-hidden"
      }  h-screen`}
    >
      <UserPlaylistDetail playlistDetail={playlistDetail} />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen">
        <div className="flex flex-row items-center mb-10 relative">
          <button>
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
          <button
            className="ml-3 mt-2"
            onClick={() => setShowOption(!showOption)}
          >
            <MdOutlineMoreHoriz className="text-4xl" />
          </button>
          {showOption && (
            <div className="absolute bg-secondary z-50 -top-20 left-28 rounded-lg flex flex-col p-2">
              <div className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer">
                <MdPlaylistAdd className="mr-2 text-xl" />
                <span>Add to queue</span>
              </div>
              <div className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer">
                <MdDelete className="text-lg mr-2" />
                <span>Delete playlist</span>
              </div>
            </div>
          )}
        </div>

        <UserSongList songs={playlistDetail.songs} />
      </div>
    </div>
  );
}

export default UserPlaylist;
