import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Search() {
  useDocumentTitle("Search | AniJP");
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
    <div className=" hide-scrollbar mt-5 h-screen overflow-y-auto px-4 pb-9 md:mt-12 md:px-10 md:pt-10">
      <h1 className="mb-2 text-2xl text-white  md:hidden">Search</h1>
      <div className="md:4/5 relative mx-auto lg:w-3/4 xl:w-1/2">
        <input
          type="text"
          className="w-full rounded-sm py-4 pl-12 text-sm outline-none"
          placeholder="Type here for search playlist"
          value={searchKeyword}
          onChange={inputHandler}
        />
        <AiOutlineSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-3xl" />
      </div>
      <Outlet />
    </div>
  );
}

export default Search;
