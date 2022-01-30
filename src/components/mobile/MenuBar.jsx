import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdLibraryMusic, MdPerson } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../../features/modals/modalSlice";

function MenuBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className="bg-primary p-5 flex flex-row justify-between text-white">
      <div>
        <Link className="flex flex-col items-center" to="/">
          <AiFillHome fontSize={20} />
          <span className="text-xs mt-2">Home</span>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col  items-center" to="/search">
          <AiOutlineSearch fontSize={20} />
          <span className="text-xs mt-2">Search</span>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col  items-center" to="/collection">
          <MdLibraryMusic fontSize={20} />
          <span className="text-xs mt-2">Collection</span>
        </Link>
      </div>
      <div>
        <Link
          className="flex flex-col items-center"
          to="/account"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              dispatch(toggleLoginModal());
            }
          }}
        >
          <MdPerson fontSize={20} />
          <span className="text-xs mt-2">Account</span>
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
