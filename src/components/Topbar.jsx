import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <header className="w-full z-10 bg-primary py-3 px-10 fixed top-0 left-0 flex flex-row justify-end shadow-md">
      <div className="flex flex-row text-white items-center">
        <Link to="/" className="mr-5">
          REGISTER
        </Link>
        <Link to="/" className="px-10 py-2 rounded-full bg-secondary">
          LOGIN
        </Link>
      </div>
      {/* <div class="flex flex-row items-center relative" v-if="userData">
        <span class="text-white text-sm mr-3 capitalize">{{ userData.username }}</span>
        <img src="@/assets/user-placeholder.png" alt="user-placeholder" class="w-8 h-8 rounded-full cursor-pointer" @click="showProfileOption = !showProfileOption">
        <div class="absolute bg-primary-300 px-5 py-2 text-white top-12 right-0 rounded-lg" v-if="showProfileOption">
          <button >Logout</button>
        </div>
      </div> */}
    </header>
  );
}

export default Topbar;
