import "./index.css";

function BarAnimation() {
  return (
    <div className="relative w-10 h-3 group-hover:hidden ml-2">
      <div className="bar absolute w-bar inset-y-0 left-0 bg-white"></div>
      <div className="bar absolute w-bar inset-y-0 left-1 bg-white"></div>
      <div className="bar absolute w-bar inset-y-0 left-2 bg-white"></div>
      <div className="bar absolute w-bar inset-y-0 left-3 bg-white"></div>
      <div className="bar absolute w-bar inset-y-0 left-4 bg-white"></div>
    </div>
  );
}

export default BarAnimation;
