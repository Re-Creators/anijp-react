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
          <div
            className="mb-5 w-1/3 px-[3px] md:mr-5 md:w-40 md:px-0 lg:w-48"
            key={playlist._id}
          >
            <Link
              to={`/playlist/${playlist._id}`}
              href=""
              className="group bg-primary-100 relative  block h-[130px] overflow-hidden overflow-y-hidden rounded-lg md:h-52 lg:h-60"
            >
              <img
                src={playlist.cover}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="bg-card-hover absolute bottom-0 h-32 w-full translate-y-48 transform transition duration-300 group-hover:translate-y-0">
                <MdPlayCircleFilled className="absolute right-3 bottom-3 text-4xl" />
              </div>
            </Link>
            <span className="text-xs font-semibold md:text-sm lg:text-base">
              {playlist.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
