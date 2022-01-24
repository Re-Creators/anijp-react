import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdLibraryMusic, MdFavorite } from "react-icons/md";

function MenuBar() {
  return (
    <div className="bg-primary p-5 flex flex-row justify-between text-white">
      <div>
        <Link className="flex flex-col items-center" to="/">
          <AiFillHome fontSize={20} />
          <span className="text-xs mt-2">Home</span>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col  items-center" to="/">
          <AiOutlineSearch fontSize={20} />
          <span className="text-xs mt-2">Search</span>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col  items-center" to="/">
          <MdLibraryMusic fontSize={20} />
          <span className="text-xs mt-2">Collection</span>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col  items-center" to="">
          <MdFavorite fontSize={20} />
          <span className="text-xs mt-2">Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
