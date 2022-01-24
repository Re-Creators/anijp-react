import { memo, useRef, useState } from "react";
import {
  MdVolumeDownAlt,
  MdList,
  MdVolumeOff,
  MdVolumeUp,
  MdVolumeMute,
} from "react-icons/md";
import PlaylistQueue from "../PlaylistQueue";
import PortalContainer from "../portal/PortalContainer";

function PlayerExtraControl({ changeVolume }) {
  const [showQueue, setShowQueue] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const volumeBar = useRef();
  const bar = useRef();
  const isMuted = useRef(false);
  const lastVolume = useRef(0.5);

  const muteHandler = () => {
    if (!isMuted.current) {
      isMuted.current = true;

      setVolume(0);
      changeVolume(0);
      bar.current.style.width = `0%`;
    } else {
      isMuted.current = false;
      changeVolume(lastVolume.current);
      setVolume(lastVolume.current);
      bar.current.style.width = `${lastVolume.current * 100}%`;
    }
  };

  const volumeBarClick = (e) => {
    const rect = volumeBar.current.getBoundingClientRect();
    const clickPos = e.pageX - rect.left;
    const newVolume = clickPos / rect.width;

    bar.current.style.width = `${newVolume * 100}%`;
    lastVolume.current = newVolume;
    setVolume(newVolume);
    changeVolume(newVolume);
  };

  const renderVolumeIcon = () => {
    if (volume <= 0) {
      return (
        <MdVolumeOff
          className="text-gray-300 transition duration-200 hover:text-white"
          fontSize={24}
        />
      );
    } else if (volume >= 0.5) {
      return (
        <MdVolumeUp
          className="text-gray-300 transition duration-200 hover:text-white"
          fontSize={24}
        />
      );
    }

    return (
      <MdVolumeDownAlt
        className="text-gray-300 transition duration-200 hover:text-white"
        fontSize={24}
      />
    );
  };

  return (
    <div className="flex flex-row items-center lg:mr-10 mt-5">
      <div className="flex flex-row items-center">
        <button aria-label="mute" onClick={muteHandler}>
          {renderVolumeIcon()}
        </button>
        <div
          className="relative bg-primary-300 w-20 h-1 mx-3 mb-1 cursor-pointer group"
          ref={volumeBar}
          onClick={volumeBarClick}
        >
          <div className="absolute h-full w-1/2 left-0 bg-secondary" ref={bar}>
            <span className="hidden absolute top-1/2 transform -translate-y-1/2 right-0 h-3 w-3 rounded-full bg-secondary group-hover:block"></span>
          </div>
        </div>
      </div>
      <div className="">
        <button className="ml-3" onClick={() => setShowQueue(!showQueue)}>
          <MdList
            className="text-gray-300 transition duration-200 hover:text-white"
            fontSize={24}
          />
        </button>
        <PortalContainer
          isShow={showQueue}
          onClose={() => setShowQueue(false)}
          transitionName="slideUp"
          timeout={400}
          backgroundColor="rgba(29, 29, 29, 0.65)"
        >
          <PlaylistQueue onClose={() => setShowQueue(false)} />
        </PortalContainer>
      </div>
    </div>
  );
}

export default memo(PlayerExtraControl);
