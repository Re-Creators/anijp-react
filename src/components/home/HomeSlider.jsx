import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../slick/Arrow";
import { MdPlayCircleFilled } from "react-icons/md";
import useCategoryBanner from "../../hooks/useCategoryBanner";
import { Link } from "react-router-dom";

function HomeSlider() {
  const { data, status } = useCategoryBanner();

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
    autoPlay: true,
    swipe: false,
    prevArrow: <Arrow type="left" />,
    nextArrow: <Arrow type="right" />,
  };

  if (status === "loading") return null;
  return (
    <div className="home-slider">
      <Slider {...settings}>
        {data.playlist.map((playlist) => (
          <div
            className="relative cursor-pointer pb-[32%] lg:pb-[28%]"
            key={playlist._id}
          >
            <Link to={`/playlist/${playlist._id}`}>
              <div className="absolute inset-0 overflow-hidden rounded-md">
                <img
                  src={playlist.banner}
                  className="aspect-banner h-auto w-full"
                  width={178}
                  height={178}
                  alt=""
                />
              </div>

              <div className="bg-overlay-playlist-dark absolute inset-0 flex items-center justify-center opacity-0 duration-300 hover:opacity-100">
                <button>
                  <MdPlayCircleFilled className="hover:text-link-active text-6xl text-white duration-300" />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeSlider;
