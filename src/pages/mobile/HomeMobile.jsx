import { Link } from "react-router-dom";
import useCategoryPlaylist from "../../hooks/useCategoryPlaylist";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function HomeMobile() {
  useDocumentTitle("AniJP - Music For Life");
  const { data, status } = useCategoryPlaylist();
  if (status === "loading") return null;

  return (
    <div className="hide-scrollbar h-screen py-3 pb-80 text-white">
      <div className="mt-5">
        <div className="px-3">
          {data.map((category) => (
            <div key={category._id}>
              <h1 className="text-center font-semibold">{category.name}</h1>
              <div className="mt-5 flex flex-wrap">
                {category.playlist.map((playlist) => (
                  <div
                    className="flex-mobile-size max-w-1/3 mb-5 px-[3px]"
                    key={playlist._id}
                  >
                    <div className="bg-primary-100 relative block w-full overflow-hidden rounded-sm pt-[100%]">
                      <Link to={`/playlist/${playlist._id}`}>
                        <img
                          src={playlist.cover}
                          alt=""
                          className="absolute top-0 left-0 h-full w-full object-cover"
                          width={300}
                          height={300}
                        />
                      </Link>
                    </div>
                    <h3 className="line-clamp-2 mt-2 text-xs">
                      {playlist.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeMobile;
