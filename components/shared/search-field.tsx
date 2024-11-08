import usePopupControl from "@/hooks/popupControl/usePopupControl";
import { Search, X } from "lucide-react";

function SearchField() {
  const { isOpen, toggleMenu } = usePopupControl();
  return (
    <>
      <div className="">
        <button
          onClick={() => {
            toggleMenu();
          }}
        >
          <Search className="mt-2 h-5" />
        </button>
      </div>
      <div
        className={`${
          isOpen
            ? "translate-y-[61px] md:translate-y-[12px] "
            : "translate-y-[-61px] md:translate-y-[-140px] "
        } fixed -z-50 w-full right-0 overflow-hidden bg-white transition-transform duration-300  `}
      >
        <div className=" h-[60px] w-full  px-4 relative max-w-container">
          <input
            type="text"
            className="h-full w-full px-4 border-none focus:outline-none"
            placeholder="Search  for a movie or tv show..."
          />

          <X
            className="text-black text-xl z-10 inset-y-0 h-full right-7 cursor-pointer hover:text-pink  absolute"
            onClick={() => {
              toggleMenu();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SearchField;
