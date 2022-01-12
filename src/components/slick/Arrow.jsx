import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

function Arrow({ className, type, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <button className="bg-white p-2 rounded-full shadow-md ">
        {type === "left" ? (
          <BiChevronLeft className="w-6 h-6 text-stone-800" />
        ) : (
          <BiChevronRight className="w-6 h-6 text-stone-800" />
        )}
      </button>
    </div>
  );
}

export default Arrow;
