import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchPlaylist } from "../query/playlistQuery";
import { client } from "../sanityClient";
import { MdPlayCircleFilled } from "react-icons/md";
import debounce from "lodash.debounce";

function SearchResult() {
  const { keyword } = useParams();
  const [results, setResults] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const doCityFilter = useMemo(
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
    doCityFilter(keyword);
  }, [keyword, doCityFilter]);

  return (
    <div className="text-white mt-3 md:mt-10 md:px-5">
      <h1 className="md:font-semibold text-lg md:text-xl">
        Result for "{keyword}"
      </h1>
      <div className="text-white mt-5 flex flex-row flex-wrap  md:justify-start">
        {results.length <= 0 && !isFetching && (
          <h1 className="text-center text-xl font-semibold w-full mt-10">
            No Result
          </h1>
        )}
        {results.map((playlist) => (
          <div
            className="md:mr-5 mb-5 w-1/3 px-[3px] md:px-0 md:w-40 lg:w-48"
            key={playlist._id}
          >
            <Link
              to={`/playlist/${playlist._id}`}
              href=""
              className="relative block h-[130px]  md:h-52 lg:h-60 overflow-y-hidden group"
            >
              <img
                src={playlist.cover}
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                <MdPlayCircleFilled className="text-4xl absolute right-3 bottom-3" />
              </div>
            </Link>
            <span className="text-xs md:text-sm lg:text-base font-semibold">
              {playlist.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
