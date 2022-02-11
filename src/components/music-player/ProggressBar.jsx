import { useCallback, useEffect, useRef } from "react";

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

  const onMove = useCallback(
    (e) => {
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
    },
    [onProgressMove, duration]
  );

  const onEndMove = useCallback(
    (e) => {
      if (startMove.current) {
        const rect = progressBar.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        let newTime = (mouseX / rect.width) * duration;

        if (e.clientX < rect.left) {
          newTime = 0;
        } else if (e.clientX > rect.right) {
          newTime = duration;
        }

        onChangeTime(newTime);
        startMove.current = false;
      }
    },
    [onChangeTime, duration]
  );

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEndMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEndMove);
    };
  }, [onEndMove, onMove]);

  return (
    <div className="mx-3 w-4/5">
      <div
        className={`relative ${progressBarColor} group h-1 w-full cursor-pointer`}
        onClick={progressBarClick}
        onMouseDown={() => {
          startMove.current = true;
        }}
        ref={progressBar}
      >
        <div className={`absolute left-0 h-full ${barColor}`} ref={progress}>
          <span
            className={`${
              showPoint ? "" : "hidden"
            } absolute top-1/2 -right-3 h-3 w-3 -translate-y-1/2 transform rounded-full ${pointColor} group-hover:block`}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default ProggressBar;
