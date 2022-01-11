import React from "react";

function ProggressBar() {
  return (
    <div className="relative bg-primary-300 w-20 h-1 mx-3 mb-1 cursor-pointer group">
      <div className="absolute h-full w-1/2 left-0 bg-secondary">
        <span className="hidden absolute top-1/2 transform -translate-y-1/2 right-0 h-2 w-2 rounded-full bg-secondary group-hover:block"></span>
      </div>
    </div>
  );
}

export default ProggressBar;
