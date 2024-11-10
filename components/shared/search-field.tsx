import usePopupControl from "@/hooks/popupControl/usePopupControl";
import useSearch from "@/hooks/search/useSearch";
import { Search, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
function SearchField() {
  const { isOpen, toggleMenu } = usePopupControl();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { data, handleClearSearch, handleSearch, searchValue } = useSearch();

  return (
    <>
      <div className="">
        <button
          onClick={() => {
            handleClearSearch();
            toggleMenu();
            inputRef.current?.focus();
          }}
        >
          <Search className="mt-2 h-5" />
        </button>
      </div>
      <div
        className={`${
          isOpen ? "translate-y-0 mt-[61px] " : "-translate-y-full   "
        } fixed top-0  -z-50 w-full right-0 overflow-hidden backdrop-blur-2xl bg-[#0c0727a8] transition-transform duration-300  `}
      >
        <div className=" h-[60px] w-full  px-4 relative max-w-container">
          <div className="flex px-4 items-center text-white opacity-70 h-full">
            <IoSearchSharp className="text-2xl" />
            <input
              type="text"
              ref={inputRef}
              className="h-full w-full px-4 border-none focus:outline-none bg-transparent"
              placeholder="Search  for a movie or tv show..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <X
            className="text-white hover:text-red-300 text-xl z-10 inset-y-0 h-full right-7 cursor-pointer hover:text-pink  absolute"
            onClick={() => {
              toggleMenu();
            }}
          />
        </div>
        {searchValue && (
          <div className=" max-h-[50vh] overflow-scroll z-[1000]    px-4 text-white opacity-80 max-w-container pb-[1px] ">
            {data?.results?.map((movie) => (
              <Link
                className=" w-full border-t border-[#23134d] py-1.5 px-4 flex items-center gap-2"
                href={{
                  pathname: `/search/${movie.id}`,
                  query: { type: movie.media_type },
                }}
                key={movie.id}
                onClick={() => {
                  toggleMenu();
                  handleClearSearch();
                }}
              >
                <BiSolidMoviePlay className="text-2xl" />
                <span>{movie.name || movie.original_title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchField;
