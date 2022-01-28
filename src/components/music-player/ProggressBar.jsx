import React, { useEffect, useRef } from "react";

function ProggressBar({
  percent,
  onChangeTime,
  onProgressMove,
  duration,
  progressBarColor,
  barColor,
  pointColor,
  showPoint,
}) {
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

    // eslint-disable-next-line
  }, [duration]);

  return (
    <div className="w-4/5 mx-3">
      <div
        className={`relative ${progressBarColor} w-full h-1 cursor-pointer group`}
        onClick={progressBarClick}
        onMouseDown={() => {
          startMove.current = true;
        }}
        ref={progressBar}
      >
        <div className={`absolute h-full left-0 ${barColor}`} ref={progress}>
          <span
            className={`${
              showPoint ? "" : "hidden"
            } absolute top-1/2 transform -translate-y-1/2 -right-3 h-3 w-3 rounded-full ${pointColor} group-hover:block`}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default ProggressBar;
