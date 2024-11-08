"use client";
import usePopupControl from "@/hooks/popupControl/usePopupControl";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SearchField from "./search-field";

const Header = () => {
  const { isOpen, toggleMenu, dropDownRef } = usePopupControl();
  // const { isOpen:sear, toggleMenu, dropDownRef } = usePopupControl();

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`${
          isOpen && "bg-secondary"
        }  fixed inset-x-0   z-50 top-0 bg-[rgba(0,0,0,.25)]  backdrop-blur-sm border-b md:border-none border-[#231d43] text-white  transition-colors duration-300  `}
      >
        <div className=" w- max-w-container flex items-center justify-between md:px-6 ">
          {/* logo */}
          <Link href={"/"}>
            <Image
              src={"/movix-logo.svg"}
              alt="Movix logo"
              height={60}
              width={60}
              className="py-1 w-full h-[60px] md:px-0 px-4"
            />
          </Link>

          {/* horizontal nav */}
          <div className="horizontal-menu md:block hidden">
            <ul className="flex items-center justify-center space-x-8  horizontal-menu z-20">
              <li className="relative group">
                <Link
                  href={"#"}
                  className={`${
                    pathname.includes("/movie/") && "active"
                  } px-1 py-3`}
                >
                  Movies
                </Link>
                <ul className="absolute bg-bg_primary shadow-sm shadow-black-light border border-black-light  top-[130%] w-[140px] text-white hidden group-hover:flex flex-col gap-2 py-3 px-4 rounded-md">
                  <li>
                    <Link href={"/movie/popular"} className="py-1 block">
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link href={"/movie/now-playing"} className="py-1  block">
                      Now Playing
                    </Link>
                  </li>
                  <li>
                    <Link href={"/movie/top-rated"} className="py-1 block">
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative group">
                <Link
                  href={"#"}
                  className={`${
                    pathname.includes("/tv/") && "active"
                  } px-1 py-3`}
                >
                  Tv Shows
                </Link>
                <ul className="absolute bg-bg_primary shadow-sm shadow-black-light border border-black-light  top-[130%] w-[140px] text-white hidden group-hover:flex flex-col gap-2 py-3 px-4 rounded-md">
                  <li>
                    <Link href={"/tv/popular"} className="py-1 block">
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link href={"/tv/on-the-air"} className="py-1  block">
                      On Tv
                    </Link>
                  </li>
                  <li>
                    <Link href={"/tv/top-rated"} className="py-1 block">
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link href={"/login"} className="px-1 py-3">
                  Login
                </Link>
              </li>

              <li className="">
                <SearchField />
              </li>
            </ul>
          </div>

          {/* vertical  menu */}
          <div
            className="vertical-menu flex items-center  space-x-4 relative md:hidden px-4  z-50"
            ref={dropDownRef}
          >
            <SearchField />
            <button
              onClick={() => {
                toggleMenu();
              }}
            >
              <X className={`${isOpen ? "" : "hidden"}`} />
              <AlignJustify className={`${isOpen ? "hidden" : ""}`} />
            </button>
            <ul
              className={`${
                isOpen ? "translate-y-[97px] " : "translate-y-[-100px] "
              } fixed text-white transition-transform duration-300  bg-[#020c1b] w-screen flex flex-col px-7 text-lg box-border  z-50  right-0  py-3`}
            >
              <li>
                <Link href={"#"} className="py-1 block">
                  Movies
                </Link>
              </li>
              <li>
                <Link href={"#"} className="py-1 block">
                  Tv Shows
                </Link>
              </li>
              <li>
                <Link href={"#"} className="py-1 block">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
