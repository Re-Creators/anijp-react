import { memo, useRef, useState } from "react";
import {
  MdVolumeDownAlt,
  MdList,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import PlaylistQueue from "../playlist-queue/PlaylistQueue";
import PortalContainer from "../portal/PortalContainer";
import TippyInfo from "../tippy/TippyInfo";

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
    <div className="mt-5 flex flex-row items-center lg:mr-10">
      <div className="flex flex-row items-center">
        <TippyInfo content={isMuted.current ? "Unmute" : "Mute"}>
          <button onClick={muteHandler}>{renderVolumeIcon()}</button>
        </TippyInfo>
        <div
          className="group relative mx-3 mb-1 h-1 w-20 cursor-pointer bg-primary-300"
          ref={volumeBar}
          onClick={volumeBarClick}
        >
          <div className="absolute left-0 h-full w-1/2 bg-secondary" ref={bar}>
            <span className="absolute top-1/2 right-0 hidden h-3 w-3 -translate-y-1/2 transform rounded-full bg-secondary group-hover:block"></span>
          </div>
        </div>
      </div>
      <div className="">
        <TippyInfo content="Play Queue">
          <button className="ml-3" onClick={() => setShowQueue(!showQueue)}>
            <MdList
              className="text-gray-300 transition duration-200 hover:text-white"
              fontSize={24}
            />
          </button>
        </TippyInfo>
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
