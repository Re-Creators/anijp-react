import React from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

function LoginAlert({ close }) {
  return (
    <div className="modal w-4/5 px-5 py-10 text-white bg-primary text-center rounded-lg">
      <button className="absolute top-0 right-0 p-3" onClick={close}>
        <MdClose className="text-2xl" />
      </button>
      <h1 className="mt-3">You have not logged in yet</h1>
      <div className="flex flex-col items-center mt-10">
        <Link
          to="/login"
          className="w-4/5 px-5 py-3 mt-5 bg-secondary rounded-md"
        >
          Login
        </Link>
        <Link to="/register" className="text-xs mt-5">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginAlert;
