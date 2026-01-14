"use client";
import usePopupControl from "@/hooks/popupControl/usePopupControl";
import { logout } from "@/lib/features/auth/auth-state-slice";
import { RootState } from "@/lib/store";
import {
  AlignJustify,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "./search-field";

const Header = () => {
  const { isOpen, toggleMenu, dropDownRef } = usePopupControl();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { movies: compareMovies } = useSelector(
    (state: RootState) => state.compare
  );
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
    {
      id: 4,
      name: "Compare",
      link: "/compare",
      active: pathname.includes("/compare"),
      showBadge: true,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <header
      className={`${
        isOpen && "bg-secondary"
      }  fixed inset-x-0   z-[2100] top-0 bg-[rgba(0,0,0,.25)]  backdrop-blur-sm border-b md:border-none border-[#231d43] text-white  transition-colors duration-300  `}
    >
      <div className=" w- max-w-container flex items-center justify-between md:px-6 overflow-visible">
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
              <li key={menu.id} className="relative">
                <Link
                  href={menu.link}
                  className={`${menu.active && "active"} px-1 py-3 relative`}
                >
                  {menu.name}
                  {menu.showBadge && compareMovies.length > 0 && (
                    <span className="absolute -top-1 -right-3 min-w-5 h-5 px-1 rounded-full bg-pink text-white text-xs flex items-center justify-center font-medium">
                      {compareMovies.length}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            <li>
              <SearchField />
            </li>

            {/* Auth Section */}
            <li className="relative" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-orange flex items-center justify-center text-white font-semibold text-sm">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="max-w-[100px] truncate text-sm">
                      {user.fullName?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#0a1929] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-medium truncate">
                          {user.fullName}
                        </p>
                        <p className="text-white/60 text-sm truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/wishlist"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>My Wishlist</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink to-orange text-white font-medium hover:opacity-90 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* vertical  menu */}
        <div
          className="vertical-menu flex items-center  space-x-4 relative md:hidden px-4  z-[100]"
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
              isOpen ? "top-[61px] opacity-100" : "-top-[500px] opacity-0"
            } fixed text-white transition-all duration-300 bg-[#020c1b] w-screen flex flex-col space-y-2 px-7 text-lg box-border z-[50]  right-0 pb-5 pt-3 shadow-2xl`}
          >
            {menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.link}
                  className={`py-1 block ${
                    menu.active && "active"
                  } relative inline-flex items-center gap-2`}
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {menu.name}
                  {menu.showBadge && compareMovies.length > 0 && (
                    <span className="min-w-5 h-5 px-1 rounded-full bg-pink text-white text-xs flex items-center justify-center font-medium">
                      {compareMovies.length}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            {/* Mobile Auth Section */}
            <li className="border-t border-white/10 pt-3 mt-2">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 pb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-orange flex items-center justify-center text-white font-semibold">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.fullName}</p>
                      <p className="text-white/60 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 py-1 text-white/80"
                    onClick={() => toggleMenu()}
                  >
                    <Heart className="w-4 h-4" />
                    <span>My Wishlist</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 py-1 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink to-orange text-white font-medium"
                    onClick={() => toggleMenu()}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
                    onClick={() => toggleMenu()}
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
