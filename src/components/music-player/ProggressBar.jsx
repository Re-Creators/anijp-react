import React, { useEffect, useRef, useState } from "react";

function ProggressBar({ percent, onChangeTime, onProgressMove, duration }) {
  const progressBar = useRef();
  const progress = useRef();

  const startMove = useRef(false);

  useEffect(() => {
    if (!startMove.current) {
      progress.current.style.width = `${percent}%`;
    }
  }, [percent]);

  const progressBarClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect();
    const clickPos = e.pageX - rect.left;
    const time = (clickPos / rect.width) * duration;

    onChangeTime(time);
  };

  useEffect(() => {
    console.log("render event");
    const onMove = (e) => {
      if (startMove.current) {
        const rect = progressBar.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        if (e.clientX > rect.left && e.clientX < rect.right) {
          const progressPercent = (mouseX / rect.width) * 100;
          const time = (mouseX / rect.width) * duration;
          progress.current.style.width = `${progressPercent}%`;
          onProgressMove(time);
        }
      }
    };

    const onEndMove = (e) => {
      if (startMove.current) {
        const rect = progressBar.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        if (e.clientX > rect.left && e.clientX < rect.right) {
          const newTime = (mouseX / rect.width) * duration;
          console.log(newTime);
          onChangeTime(newTime);
        }

        startMove.current = false;
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEndMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEndMove);
    };
  }, [duration]);

  return (
    <div className="w-4/5 mx-3">
      <div
        className="relative bg-primary-300 w-full h-1 cursor-pointer group"
        onClick={progressBarClick}
        onMouseDown={() => {
          startMove.current = true;
        }}
        ref={progressBar}
      >
        <div
          className="absolute h-full left-0 bg-secondary w-1/2"
          ref={progress}
        >
          <span className="hidden absolute top-1/2 transform -translate-y-1/2 -right-3 h-3 w-3 rounded-full bg-secondary group-hover:block"></span>
        </div>
      </div>
    </div>
  );
}

export default ProggressBar;
