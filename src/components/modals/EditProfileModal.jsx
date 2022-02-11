import { useEffect, useRef, useState } from "react";
import { MdClose, MdCreate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectisLoading,
  selectUser,
  updateUserData,
} from "../../features/user/userSlice";
import Spinner from "../UI/Spinner";

function EditProfileModal({ onClose }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectisLoading);
  const [username, setUsername] = useState(user.username);
  const [nameIsChanged, setNameIsChanged] = useState(false);
  const prevImageRef = useRef();
  const imageFileRef = useRef();

  const fileChangeHandler = (e) => {
    imageFileRef.current = e.target.files[0];
    prevImageRef.current.src = URL.createObjectURL(imageFileRef.current);
  };

  useEffect(() => {
    if (username === user.username || username === "") {
      setNameIsChanged(false);
    } else {
      setNameIsChanged(true);
    }
  }, [username, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const newData = { username, newPhoto: imageFileRef.current };
    const onSuccess = () => {
      onClose();
      toast.success("Profile updated");
    };

    dispatch(updateUserData({ newData, onSuccess }));
  };

  return (
    <div className="modal flex w-2/5 flex-col items-center justify-center rounded-md bg-primary px-4 py-14 text-white">
      <button className="absolute top-5 right-5" onClick={onClose}>
        <MdClose className="text-2xl" />
      </button>
      <h1 className="mb-5 text-2xl">Edit Profile</h1>
      <form onSubmit={submitHandler}>
        <div className="flex w-full justify-center">
          <div className="group relative my-auto mb-3 h-40  w-full cursor-pointer overflow-hidden rounded-full md:mb-0 md:h-[180px] md:w-[180px] md:border-0 ">
            <img
              src={user.photo}
              alt=""
              className=" h-full w-full object-cover object-center md:block"
              ref={prevImageRef}
            />
            <div className="absolute top-0 h-full w-full rounded-lg bg-overlay-gray md:hidden md:group-hover:flex">
              <label
                htmlFor="cover"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-white"
              >
                <MdCreate className="mb-3 text-4xl" />
                <span>Change Picture</span>
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
          <div className="ml-5 flex w-1/2 flex-col items-center justify-center">
            <input
              value={username}
              type="text"
              className="w-full border-b-2  border-secondary bg-transparent text-center outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="mt-5 rounded-md bg-secondary px-14 py-2"
              type="submit"
              disabled={!nameIsChanged}
            >
              {isLoading ? <Spinner /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfileModal;
