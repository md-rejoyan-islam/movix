import usePopupControl from "@/hooks/popupControl/usePopupControl";
import useSearch from "@/hooks/search/useSearch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSolidMoviePlay } from "react-icons/bi";

export default function HomeSearch() {
  const { data, handleClearSearch, handleSearch, searchValue } = useSearch({});

  const router = useRouter();

  const { dropDownRef, isOpen, toggleMenu } = usePopupControl();
  return (
    <div ref={dropDownRef}>
      <div
        className={`flex items-center w-full bg-white ${
          isOpen && searchValue
            ? "rounded-b-none rounded-t-[30px]"
            : "rounded-[30px]"
        }`}
      >
        <input
          type="text"
          className={`h-[50px] md:h-[60px] text-sm md:text-[20px] py-0 px-[15px] md:px-[30px] w-[calc(100%-100px)] md:w-[calc(100%-150px)] rounded-[30px_0_0_30px] border-none outline-none text-black`}
          placeholder="Search for a movie or tv show...."
          value={searchValue}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?title=${searchValue}`);
            }
          }}
          onClick={toggleMenu}
        />
        <button
          className={`h-[50px] md:h-[60px] w-[100px] md:w-[150px] text-base md:text-xl text-white bg-gradient-to-r from-[#f89e00] from-99% to-[#da2f68] to-100% ${
            isOpen && searchValue
              ? "rounded-[0_30px_0_0]"
              : "rounded-[0_30px_30px_0]"
          }`}
          onClick={() => {
            router.push(`/search?title=${searchValue}`);
          }}
        >
          Search
        </button>
      </div>
      {/* search result  */}
      {isOpen && (
        <div
          className={`max-h-[50vh]  overflow-scroll z-[1000] rounded-b-[30px] ${
            searchValue && "pb-3"
          }  bg-[#0c0623]  px-4 text-white opacity-80 max-w-container`}
        >
          {data?.results?.map((movie) => (
            <Link
              className=" w-full border-t border-[#23134d] py-1.5 px-4 flex items-center gap-2"
              href={{
                pathname: `/search/${movie.id}`,
                query: { type: movie.media_type },
              }}
              key={movie.id}
              onClick={() => {
                handleClearSearch();
                toggleMenu();
              }}
            >
              <BiSolidMoviePlay className="text-2xl" />
              <span>{movie.name || movie.original_title}</span>
            </Link>
          ))}
          {data?.results?.length === 0 && searchValue && (
            <p className="text-lg py-3 text-red-500">No result found</p>
          )}
        </div>
      )}
    </div>
  );
}
