import PlayerController from "./PlayerController";

function MusicPlayer() {
  return (
    <div className="fixed z-50 w-full flex flex-row items-center justify-between py-5 px-5 bottom-0 bg-primary shadow-2xl">
      <div className="md:w-1/4 lg:w-1/5 flex flex-row items-center relative">
        <div className="w-20 h-20 p-3  bg-secondary rounded-full absolute">
          <img
            src="/sample/images/snk.jpg"
            alt=""
            className="w-full h-full rounded-full border-2"
          />
        </div>
        <div className="text-white ml-24">
          <h1 className="md:text-sm lg:text-base md:w-28 lg:w-auto clamp-1">
            Kataomoi
          </h1>
          <span className="md:text-xs lg:text-sm text-gray-300  md:w-28 lg:w-auto clamp-1">
            Aimer
          </span>
        </div>
      </div>

      <PlayerController />
    </div>
  );
}

export default MusicPlayer;
