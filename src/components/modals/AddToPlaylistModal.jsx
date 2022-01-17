import { MdOutlineClose } from "react-icons/md";
import NewPlaylistModal from "./NewPlaylistModal";

function AddToPlaylistModal({ showChildModal, toggleChildModal, closeModal }) {
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
            <span>My playlist(2)</span>
            <button
              className="px-3 py-1 bg-secondary rounded-md"
              onClick={toggleChildModal}
            >
              New Playlist
            </button>
          </div>
          <div className="mt-5 px-8 h-96 overflow-y-auto">
            <div className="flex flex-row h-20 cursor-pointer px-5 py-3 hover:bg-secondary rounded-md">
              <img
                src="/sample/images/kny.jpg"
                alt=""
                className="w-20 h-full object-cover object-center rounded-lg"
              />
              <div className="text-sm text-white ml-5">
                <h1 className="mb-2">Chilling bro</h1>
                <span className=" text-gray-400">2 - Song</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToPlaylistModal;
