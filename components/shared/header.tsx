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
  const pathname = usePathname();

  const menus = [
    { id: 1, name: "Home", link: "/", active: pathname === "/" },
    {
      id: 2,
      name: "Tv Shows",
      link: "/tv-shows",
      active: pathname.includes("/tv-shows"),
    },
    {
      id: 3,
      name: "Movies",
      link: "/movies",
      active: pathname.includes("/movies"),
    },
    // { id: 4, name: "Login", link: "/login", active: pathname === "/login" },
  ];

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
              {menus.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.link}
                    className={`${menu.active && "active"} px-1 py-3`}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}

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
                isOpen ? "translate-y-[109px] " : "translate-y-[-120px] "
              } fixed text-white  transition-transform duration-300  bg-[#020c1b] w-screen flex flex-col space-y-2 px-7 text-lg box-border  z-50  right-0  py-4`}
            >
              {menus.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.link}
                    className={`py-1 block ${menu.active && "active"}`}
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
