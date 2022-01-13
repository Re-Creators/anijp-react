import { memo, useState } from "react";
import { MdVolumeDownAlt, MdList } from "react-icons/md";
import PlaylistQueue from "../PlaylistQueue";
import PortalContainer from "../portal/PortalContainer";

function PlayerExtraControl() {
  const [showQueue, setShowQueue] = useState(false);

  return (
    <div className="flex flex-row items-center lg:mr-10 mt-5">
      <div className="flex flex-row items-center">
        <button aria-label="mute">
          <MdVolumeDownAlt
            className="text-gray-300 transition duration-200 hover:text-white"
            fontSize={24}
          />
        </button>
        <div className="relative bg-primary-300 w-20 h-1 mx-3 mb-1 cursor-pointer group">
          <div className="absolute h-full w-1/2 left-0 bg-secondary">
            <span className="hidden absolute top-1/2 transform -translate-y-1/2 right-0 h-2 w-2 rounded-full bg-secondary group-hover:block"></span>
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
          onCLose={() => setShowQueue(false)}
          transitionName="slideUp"
          timeout={400}
        >
          <PlaylistQueue onClose={() => setShowQueue(false)} />
        </PortalContainer>
      </div>
    </div>
  );
}

export default memo(PlayerExtraControl);