import HomeSlider from "../components/home/HomeSlider";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";
import useCategoryPlaylist from "../hooks/useCategoryPlaylist";
import useCategoryBanner from "../hooks/useCategoryBanner";
import { useEffect } from "react";
import { setHelmetTitle } from "../features/helmet-title/helmetTitleSlice";
import PlaylistCard from "../cards/PlaylistCard";

function Home() {
  const { data, isLoading } = useCategoryPlaylist();
  const { data: dataBanner, status } = useCategoryBanner();
  const dispatch = useDispatch();

  const playHandler = (e, songs) => {
    e.preventDefault();
    dispatch(addNewSongs({ songs, indexSong: 0 }));
    dispatch(setIsPlaying(true));
  };

  useEffect(() => {
    dispatch(setHelmetTitle("AniJP | Music For Life"));
  }, [dispatch]);

  if (isLoading || status === "loading") return null;
  return (
    <div className="hide-scrollbar mt-5 h-screen px-5 pb-96 md:px-10">
      <HomeSlider data={dataBanner} />
      <div className="mt-10">
        {data.map((category) => (
          <div className="" key={category._id}>
            <h1 className="font-semibold text-white md:text-lg lg:text-xl">
              {category.name}
            </h1>
            <div className="mt-5 flex flex-row flex-wrap text-white">
              {category.playlist.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  name={playlist.name}
                  id={playlist._id}
                  coverImage={playlist.cover}
                  songs={playlist.songs}
                  playHandler={playHandler}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
