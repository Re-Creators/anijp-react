import { MdFavorite, MdLibraryMusic } from "react-icons/md";

function Detail(props) {
  const { cover, playlistName, description, likeCount, songCount, type } =
    props;

  return (
    <div className="w-full h-80 relative mt-10">
      <div
        className="absolute  w-full h-full bg-no-repeat bg-cover bg-center  z-0"
        style={{ backgroundImage: `url("${cover}")` }}
      ></div>
      <div className="relative w-full h-full backdrop-filter backdrop-blur-3xl bg-overlay-playlist-dark">
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-0 w-full flex flex-row">
          <div className="w-48 h-52">
            <img
              src={cover}
              alt=""
              className="w-full h-full object-cover object-center rounded-md shadow-md"
            />
          </div>
          <div className="md:ml-5 lg:ml-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase">{type}</span>
              <h1 className="title md:text-4xl lg:text-4xl xl:text-6xl mt-3">
                {playlistName}
              </h1>
            </div>
            <div>
              <p className="text-xs overflow-hidden text-gray-300 w-52 lg:w-96 truncate">
                {description}
              </p>
              <div className="flex flex-row text-xs mt-3">
                {likeCount && (
                  <div className="flex flex-row items-center mr-3">
                    <MdFavorite className="text-lg mr-1" />
                    <span> {likeCount} Likes</span>
                  </div>
                )}

                <div className="flex flex-row items-center">
                  <MdLibraryMusic className="text-lg mr-1" />
                  <span>{songCount} Songs</span>
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
