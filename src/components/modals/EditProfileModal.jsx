import { useRef, useState } from "react";
import { MdClose, MdCreate } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

function EditProfileModal({ onClose }) {
  const user = useSelector(selectUser);

  const [username, setUsername] = useState(user.username);

  const prevImageRef = useRef();
  const imageFileRef = useRef();

  const fileChangeHandler = (e) => {
    imageFileRef.current = e.target.files[0];
    prevImageRef.current.src = URL.createObjectURL(imageFileRef.current);
  };

  return (
    <div className="modal w-2/5 bg-primary px-4 py-14 rounded-md text-white flex flex-col items-center justify-center">
      <button className="absolute top-5 right-5" onClick={onClose}>
        <MdClose className="text-2xl" />
      </button>
      <h1 className="text-2xl mb-5">Edit Profile</h1>
      <div className="flex justify-center w-full">
        <div className="my-auto w-full h-40 md:w-[180px] mb-3  md:mb-0 md:h-[180px] rounded-full overflow-hidden md:border-0 relative cursor-pointer group ">
          <img
            src={user.photo}
            alt=""
            className=" md:block w-full h-full object-cover object-center"
            ref={prevImageRef}
          />
          <div className="md:hidden md:group-hover:flex absolute w-full h-full bg-overlay-gray top-0 rounded-lg">
            <label
              htmlFor="cover"
              className="h-full w-full text-white cursor-pointer flex flex-col items-center justify-center"
            >
              <MdCreate className="text-4xl mb-3" />
              <span>Change Picture</span>
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
        <div className="ml-5 w-1/2 flex flex-col items-center justify-center">
          <input
            value={username}
            type="text"
            className="w-full bg-transparent  border-b-2 border-secondary outline-none text-center"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="px-10 py-2 bg-secondary rounded-md mt-5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
