import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../slick/Arrow";

function HomeSlider() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: false,
    swipe: false,
    prevArrow: <Arrow type="left" />,
    nextArrow: <Arrow type="right" />,
  };
  return (
    <div className="home-slider">
      <Slider {...settings}>
        <div className="h-48 md:h-60 lg:h-72">
          <img
            src="/sample/images/aimer-cover.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-48 md:h-60 lg:h-72">
          <img
            src="/sample/images/eir-aoi.jpg"
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        </div>
        <div className="h-48 md:h-60 lg:h-72">
          <img
            src="/sample/images/kobasolo.jpg"
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        </div>
        <div className="h-48 md:h-60 lg:h-72">
          <img
            src="/sample/images/lisa-japan.jpg"
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlider;
