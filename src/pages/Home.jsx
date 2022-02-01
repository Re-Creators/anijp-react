import { Link } from "react-router-dom";
import HomeSlider from "../components/home/HomeSlider";
import { MdPlayCircleFilled } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";
import useCategoryPlaylist from "../hooks/useCategoryPlaylist";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useCategoryBanner from "../hooks/useCategoryBanner";

function Home() {
  useDocumentTitle("AniJP | Music For Life");

  const { data, isLoading } = useCategoryPlaylist();
  const { data: dataBanner, status } = useCategoryBanner();
  const dispatch = useDispatch();

  if (isLoading || status === "loading") return null;
  return (
    <div className="hide-scrollbar mt-5 h-screen min-w-[765px] px-10 pb-96">
      <HomeSlider data={dataBanner} />
      <div className="mt-10">
        {data.map((category) => (
          <div className="" key={category._id}>
            <h1 className="font-semibold text-white md:text-lg lg:text-xl">
              {category.name}
            </h1>
            <div className="mt-5 flex flex-row flex-wrap text-white">
              {category.playlist.map((playlist) => (
                <div className="mr-10 mb-5" key={playlist._id}>
                  <Link
                    to={`/playlist/${playlist._id}`}
                    className="group bg-primary-100 relative mb-2 block h-40 w-32 overflow-hidden overflow-y-hidden rounded-md shadow-lg md:h-52 md:w-40 lg:h-60 lg:w-48
                    "
                  >
                    <img
                      src={playlist.cover}
                      alt=""
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <div className="bg-card-hover absolute bottom-0 h-32 w-full translate-y-48 transform transition duration-300 group-hover:translate-y-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            addNewSongs({ songs: playlist.songs, indexSong: 0 })
                          );
                          dispatch(setIsPlaying(true));
                        }}
                      >
                        <MdPlayCircleFilled className="material-icons absolute right-3 bottom-3 text-4xl" />
                      </button>
                    </div>
                  </Link>
                  <span className="line-clamp-2 overflow-x-hidden text-xs md:w-40 md:text-sm lg:w-48 lg:text-base">
                    {playlist.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
