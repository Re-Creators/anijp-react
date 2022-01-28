import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategoryPlaylist from "../../hooks/useCategoryPlaylist";

function HomeMobile() {
  const { data, status } = useCategoryPlaylist();
  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="py-3 text-white">
      <div className="mt-5">
        <div className="px-3">
          <h1 className="font-semibold text-center">Popular Japanese Singer</h1>
          <div className="flex flex-wrap mt-5">
            {data.map((playlist) => (
              <div
                className="px-[3px] flex-mobile-size max-w-1/3 mb-5"
                key={playlist._id}
              >
                <div className="overflow-hidden pt-[100%] rounded-sm relative block w-full">
                  <Link to={`/playlist/${playlist._id}`}>
                    <img
                      src={playlist.cover}
                      alt=""
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>
                <h3 className="text-xs mt-2 line-clamp-2">{playlist.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMobile;
