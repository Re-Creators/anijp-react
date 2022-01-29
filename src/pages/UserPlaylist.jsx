import { useState } from "react";
import { MdOutlineMoreHoriz, MdPlaylistAdd, MdDelete } from "react-icons/md";
import UserSongList from "../components/user-playlist/UserSongList";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
  addPlaylistSong,
} from "..//features/music-player/musicPlayerSlice";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../components/playlist/Detail";
import { getUserPlaylist } from "../features/user-playlist/userPlaylistSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useUserPlaylist } from "../hooks/useUserPlaylist";

function UserPlaylist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOption, setShowOption] = useState(false);
  const user = useSelector(selectUser);

  const { data, onDeleteSong, deletePlaylist } = useUserPlaylist(id, () => {
    setShowOption(false);
    dispatch(getUserPlaylist(user.uid));
    navigate("/collection");
  });

  const onPlayAll = (indexSong) => {
    dispatch(addNewSongs({ songs: data.songs, indexSong }));
    dispatch(setIsPlaying(true));
  };

  const onSetPlaying = (value) => {
    dispatch(setIsPlaying(value));
  };

  const addToQueue = () => {
    setShowOption(false);
    addPlaylistSong(data.songs);
  };

  if (!data) return <p>loading..</p>;
  return (
    <div className="text-white hide-scrollbar h-screen">
      <Detail
        songCount={data.songs.length}
        playlistName={data.name}
        cover={data.cover}
        description={data.description}
        type="my playlist"
      />
      <div className="w-full bg-playlist-container md:px-5 lg:px-10 py-5 min-h-screen">
        <div className="flex flex-row items-center mb-10 relative">
          <button onClick={() => onPlayAll(0)}>
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
              <div
                className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer"
                onClick={addToQueue}
              >
                <MdPlaylistAdd className="mr-2 text-xl" />
                <span>Add to queue</span>
              </div>
              <div
                className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm flex flex-row items-center cursor-pointer"
                onClick={deletePlaylist}
              >
                <MdDelete className="text-lg mr-2" />
                <span>Delete playlist</span>
              </div>
            </div>
          )}
        </div>

        <UserSongList
          songs={data.songs}
          onPlayAll={onPlayAll}
          onSetPlaying={onSetPlaying}
          onDeleteSong={onDeleteSong}
        />
      </div>
    </div>
  );
}

export default UserPlaylist;
