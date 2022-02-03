import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../slick/Arrow";
import { MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";

function HomeSlider({ data, onPlay }) {
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          centerPadding: "0px",
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home-slider">
      <Slider {...settings}>
        {data.playlist.map((playlist) => (
          <div
            className="bg-primary-100 relative cursor-pointer overflow-hidden rounded-md pb-[40%] md:pb-[30%]"
            key={playlist._id}
          >
            <Link to={`/playlist/${playlist._id}`}>
              <div className="absolute inset-0">
                <img
                  src={playlist.banner}
                  className="aspect-banner h-full w-full object-cover md:h-auto md:object-contain"
                  width={178}
                  height={178}
                  alt=""
                />
              </div>

              <div className="bg-overlay-playlist-dark absolute inset-0 flex items-center justify-center opacity-0 duration-300 hover:opacity-100">
                <button onClick={(e) => onPlay(e, playlist.songs)}>
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
