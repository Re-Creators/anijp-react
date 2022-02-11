function BarAnimation() {
  return (
    <div className="relative ml-2 h-3 w-10 group-hover:hidden">
      <div className="bar absolute inset-y-0 left-0 w-bar bg-white"></div>
      <div className="bar absolute inset-y-0 left-1 w-bar bg-white"></div>
      <div className="bar absolute inset-y-0 left-2 w-bar bg-white"></div>
      <div className="bar absolute inset-y-0 left-3 w-bar bg-white"></div>
      <div className="bar absolute inset-y-0 left-4 w-bar bg-white"></div>
    </div>
  );
}

export default BarAnimation;
