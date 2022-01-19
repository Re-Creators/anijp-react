import { MdOutlineClose } from "react-icons/md";
import NewPlaylistModal from "./NewPlaylistModal";
import { useUserPlaylist } from "../../hooks/useUserPlaylist";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";

function AddToPlaylistModal({
  showChildModal,
  toggleChildModal,
  closeModal,
  user,
  selectedSong,
}) {
  const { userPlaylist, fetchData } = useUserPlaylist(user);

  const addToPlaylist = async (id) => {
    closeModal();
    const docRef = doc(db, "user_playlists", id);

    try {
      const doc = await getDoc(docRef);
      const songs = doc.data().songs;
      const newSong = selectedSong;
      const songExist = songs.some((oldSong) => newSong._id === oldSong._id);

      if (!songExist) {
        const toastLoading = toast.loading("Adding song");

        songs.push(newSong);
        await updateDoc(docRef, { songs: songs }, { merge: true });
        toast.update(toastLoading, {
          render: "Song successfully added",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        closeModal();
        toast.error("Song already in playlist");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {showChildModal ? (
        <NewPlaylistModal />
      ) : (
        <div className="modal w-full h-full md:h-auto md:w-1/2 lg:w-2/5 py-8 bg-primary md:rounded-lg">
          <div className="flex flex-row justify-between text-white px-8 mb-3">
            <h1 className="text-xl font-semibold">Add to playlist</h1>
            <button onClick={closeModal}>
              <MdOutlineClose className="text-2xl" />
            </button>
          </div>
          <div className="divider border-t-2 border-primary-300 mb-3"></div>
          <div className="flex flex-row justify-between text-white px-8 items-center mt-5">
            <span>My playlist({userPlaylist.length})</span>
            <button
              className="px-3 py-1 bg-secondary rounded-md"
              onClick={toggleChildModal}
            >
              New Playlist
            </button>
          </div>
          <div className="mt-5 px-8 h-96 overflow-y-auto">
            {userPlaylist.map((playlist) => (
              <div
                className="flex flex-row h-20 cursor-pointer px-5 py-3 hover:bg-secondary rounded-md"
                key={playlist.id}
                onClick={() => addToPlaylist(playlist.id)}
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-20 h-full object-cover object-center rounded-lg"
                />
                <div className="text-sm text-white ml-5">
                  <h1 className="mb-2">{playlist.name}</h1>
                  <span className=" text-gray-400">
                    {playlist.songs.length} - Song
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AddToPlaylistModal;
