import { useRef, useState, memo, useContext, useEffect } from "react";
import { MdCreate } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { createNewPlaylist } from "../../services/firebaseAPI";
import portalContext from "../../context/PortalContext";
import Spinner from "../UI/Spinner";

function NewPlaylistModal({ hideModal, fetchData }) {
  const { loading, setLoading } = useContext(portalContext);
  const user = useSelector(selectUser);

  const prevImageRef = useRef();
  const imageFileRef = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      setIsNameEmpty(true);
      return;
    }

    setLoading(true);
    createNewPlaylist(imageFileRef.current, user.uid, name, description)
      .then(() => {
        fetchData();
        setLoading(false);
        toast.success("Playlist created");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      })
      .finally(() => hideModal());
  };

  const fileChangeHandler = (e) => {
    imageFileRef.current = e.target.files[0];
    prevImageRef.current.src = URL.createObjectURL(imageFileRef.current);
  };

  useEffect(() => {
    if (name !== "") {
      setIsNameEmpty(false);
    }
  }, [name]);
  return (
    <div className="modal bg-primary w-4/5 rounded-lg p-5 md:w-2/3 md:p-8 lg:w-1/2 xl:w-2/5">
      {loading && (
        <div className="bg-overlay-playlist-dark absolute inset-0 z-[60] flex items-center justify-center rounded-lg">
          <Spinner classSize="h-16 w-16" />
        </div>
      )}

      <h1 className="mb-3 text-xl text-white">New Playlist</h1>
      <form onSubmit={submitHandler}>
        <div className="flex w-full flex-col md:flex-row">
          <div className="group relative mx-auto mb-3 h-40  w-full cursor-pointer md:mb-0 md:h-52 md:w-1/2 md:border-0 ">
            <img
              src="/images/new-playlist.png"
              alt=""
              className=" h-full w-full rounded-lg object-cover object-center md:block"
              ref={prevImageRef}
            />
            <div className="bg-overlay-gray absolute top-0 h-full w-full rounded-lg md:hidden md:group-hover:flex">
              <label
                htmlFor="cover"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-white"
              >
                <MdCreate className="mb-3 text-4xl" />
                <span>Choose Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="absolute h-0 opacity-0"
                id="cover"
                onChange={fileChangeHandler}
              />
            </div>
          </div>
          <div className="flex h-40 w-full flex-col text-sm md:ml-5 md:h-52 md:w-1/2">
            <div className="mb-3">
              <input
                type="text"
                value={name}
                className={`bg-primary-300 h-full w-full rounded-md border  px-5 py-3 text-white outline-none ${
                  isNameEmpty ? "border-red-600" : "border-transparent"
                }`}
                placeholder="Add your title here"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <textarea
                value={description}
                className="bg-primary-300 h-24 w-full resize-none rounded-md px-5 py-3 text-white outline-none md:h-auto"
                rows="6"
                cols="50"
                placeholder="Add an optional description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          className="bg-secondary float-right mt-3 rounded-md px-10 py-2 text-white"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default memo(NewPlaylistModal);
