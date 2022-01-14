import { useRef } from "react";
import { MdCreate } from "react-icons/md";

function NewPlaylistModal() {
  const prevImageRef = useRef();

  const fileChangeHandler = (e) => {
    const imageFile = e.target.files[0];
    prevImageRef.current.src = URL.createObjectURL(imageFile);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-primary p-5 md:p-8 rounded-lg">
      <h1 className="text-white text-xl mb-3">New Playlist</h1>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full h-40 md:w-1/2 mx-auto mb-3  md:mb-0 md:h-52 md:border-0 relative cursor-pointer group ">
          <img
            src="/images/new-playlist.png"
            alt=""
            className=" md:block w-full h-full object-cover object-center rounded-lg"
            ref={prevImageRef}
          />
          <div className="md:hidden md:group-hover:flex absolute w-full h-full bg-overlay-gray top-0 rounded-lg">
            <label
              htmlFor="cover"
              className="h-full w-full text-white cursor-pointer flex flex-col items-center justify-center"
            >
              <MdCreate className="text-4xl mb-3" />
              <span>Choose Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="absolute opacity-0 h-0"
              id="cover"
              onChange={fileChangeHandler}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-40 md:h-52 md:ml-5 text-sm flex flex-col">
          <div className="mb-3">
            <input
              type="text"
              className="w-full h-full text-white bg-primary-300 px-5 py-3 outline-none rounded-md"
              placeholder="Add your title here"
              v-model="playlistName"
            />
          </div>
          <div className="">
            <textarea
              className="w-full px-5 py-3 bg-primary-300 outline-none rounded-md resize-none text-white h-24 md:h-auto"
              rows="6"
              cols="50"
              placeholder="Add an optional description"
              v-model="playlistDescription"
            ></textarea>
          </div>
        </div>
      </div>
      <button className="px-10 py-2 bg-secondary text-white rounded-md mt-3 float-right">
        Save
      </button>
    </div>
  );
}

export default NewPlaylistModal;
