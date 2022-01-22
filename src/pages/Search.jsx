import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");

  const inputHandler = (e) => {
    setSearchKeyword(e.target.value);

    if (e.target.value !== "") {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <div className=" mt-5 md:mt-12 px-4 md:px-10 md:pt-10 h-screen overflow-y-auto pb-9 hide-scrollbar">
      <h1 className="text-white text-2xl mb-2  md:hidden">Search</h1>
      <div className="md:4/5 lg:w-3/4 xl:w-1/2 relative mx-auto">
        <input
          type="text"
          className="w-full py-4 pl-12 outline-none rounded-sm text-sm"
          placeholder="Type here for search playlist"
          value={searchKeyword}
          onChange={inputHandler}
        />
        <AiOutlineSearch className="text-3xl absolute left-2 top-1/2 transform -translate-y-1/2" />
      </div>
      <Outlet />
    </div>
  );
}

export default Search;
