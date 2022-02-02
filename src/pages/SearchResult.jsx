import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import debounce from "lodash.debounce";
import PlaylistCard from "../cards/PlaylistCard";
import { useDispatch } from "react-redux";
import {
  addNewSongs,
  setIsPlaying,
} from "../features/music-player/musicPlayerSlice";

function SearchResult() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const playHandler = (e, songs) => {
    e.preventDefault();
    dispatch(addNewSongs({ songs, indexSong: 0 }));
    dispatch(setIsPlaying(true));
  };

  const doSearch = useMemo(
    () =>
      debounce((keyword) => {
        setIsFetching(true);
        client
          .fetch(searchPlaylist, { keyword: `*${keyword}*` })
          .then((data) => {
            setResults(data);
            setIsFetching(false);
          });
      }, 1000),
    []
  );

  useEffect(() => {
    doSearch(keyword);
  }, [keyword, doSearch]);

  return (
    <div className="mt-3 text-white md:mt-10 md:px-5">
      <h1 className="text-lg md:text-xl md:font-semibold">
        Result for "{keyword}"
      </h1>
      <div className="mt-5 flex flex-row flex-wrap text-white  md:justify-start">
        {results.length <= 0 && !isFetching && (
          <h1 className="mt-10 w-full text-center text-xl font-semibold">
            No Result
          </h1>
        )}
        {results.map((playlist) => (
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
  );
}

export default SearchResult;
