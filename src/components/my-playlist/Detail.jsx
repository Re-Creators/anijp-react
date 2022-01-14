import { MdOutlineFavoriteBorder, MdLibraryMusic } from "react-icons/md";

function Detail() {
  return (
    <div className="w-full h-80 relative mt-10">
      <div
        className="absolute  w-full h-full bg-no-repeat bg-cover bg-center  z-0"
        style={{ backgroundImage: 'url("/sample/images/eir-aoi.jpg")' }}
      ></div>
      <div className="relative w-full h-full backdrop-filter backdrop-blur-3xl bg-overlay-playlist-dark">
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-0 w-full flex flex-row">
          <div className="w-48 h-52">
            <img
              src="/sample/images/sao.jpg"
              alt=""
              className="w-full h-full object-cover object-center rounded-md shadow-md"
            />
          </div>
          <div className="md:ml-5 lg:ml-8 flex flex-col justify-between">
            <div>
              <span className="text-xs">PLAYLIST</span>
              <h1 className="title md:text-4xl lg:text-4xl xl:text-6xl mt-3">
                Aimer Collection
              </h1>
            </div>
            <div>
              <p className="text-xs overflow-hidden text-gray-300 w-52 lg:w-96 truncate">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi,
                quas!
              </p>
              <div className="flex text-xs mt-3">
                <div className="flex flex-row items-center">
                  <MdLibraryMusic className="text-lg mr-1" />
                  <span>12 Songs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
