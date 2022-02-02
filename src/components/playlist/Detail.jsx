import { MdFavorite, MdLibraryMusic } from "react-icons/md";

function Detail(props) {
  const { cover, playlistName, description, likeCount, songCount, type } =
    props;

  return (
    <div className="relative h-80 w-full">
      {type !== "favorite" && (
        <div
          className="absolute z-[-1] h-full w-full bg-center bg-no-repeat blur-2xl"
          style={{ backgroundImage: `url("${cover}")` }}
        ></div>
      )}

      <div className="bg-overlay-playlist-dark relative h-full w-full ">
        <div className="absolute top-1/2 left-10 z-0 flex w-full -translate-y-1/2 transform flex-row">
          <div className="bg-primary-100 h-52 w-48 overflow-hidden rounded-md">
            <img
              src={cover}
              alt=""
              className="h-full w-full object-cover object-center shadow-md"
            />
          </div>
          <div className="ml-3 flex flex-col justify-between md:ml-5 lg:ml-8">
            <div>
              <span className="text-xs uppercase">{type}</span>
              <h1 className="title mt-3 md:text-4xl lg:text-4xl xl:text-6xl">
                {playlistName}
              </h1>
            </div>
            <div>
              <p className="w-52 overflow-hidden truncate text-xs text-gray-300 lg:w-96">
                {description}
              </p>
              <div className="mt-3 flex flex-row text-xs">
                {likeCount >= 0 && (
                  <div className="mr-3 flex flex-row items-center">
                    <MdFavorite className="mr-1 text-lg" />
                    <span> {likeCount} Likes</span>
                  </div>
                )}

                <div className="flex flex-row items-center">
                  <MdLibraryMusic className="mr-1 text-lg" />
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
