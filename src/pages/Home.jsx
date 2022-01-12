import React from "react";
import { Link } from "react-router-dom";
import HomeSlider from "../components/home/HomeSlider";
import { MdPlayCircleFilled } from "react-icons/md";

function Home() {
  return (
    <div>
      <HomeSlider />
      <div className="mt-10">
        <h1 className="text-white md:text-lg lg:text-xl font-semibold">
          Most Popular Soundtrack
        </h1>
        <div className="text-white mt-5 flex flex-row flex-wrap">
          <div className="mr-10 mb-5">
            <Link
              to="/"
              className="relative block w-32 h-40 md:w-40 lg:w-48 md:h-52 lg:h-60 overflow-y-hidden mb-2 group"
            >
              <img
                src="/sample/images/snk.jpg"
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="transition duration-300 transform translate-y-48 absolute w-full h-32 bottom-0 bg-card-hover group-hover:translate-y-0">
                <MdPlayCircleFilled className="material-icons text-4xl absolute right-3 bottom-3" />
              </div>
            </Link>
            <span className="md:w-40 lg:w-48 clamp-2 overflow-x-hidden text-xs md:text-sm lg:text-base">
              Aimer Collection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
