import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../Context/AuthProvider";

function Navbar() {
  const [authUser] = useAuth(); // no need to destructure setter if unused
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [sticky, setSticky] = useState(false);

  // Handle theme switching
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // Handle sticky navbar
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/about">About</a></li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
      ${sticky ? "shadow-md bg-base-200 dark:bg-slate-700" : "dark:bg-slate-800"} 
      dark:text-white`}
    >
      <div className="navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="text-2xl font-bold cursor-pointer">Kitab</a>
        </div>

        {/* Navbar Center (for large screens) */}
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">{navItems}</ul>
        </div>

        {/* Navbar End */}
        <div className="space-x-3 navbar-end">
          {/* Search bar */}
          <div className="hidden md:block">
            <label className="flex items-center gap-2 px-3 py-2 border rounded-md">
              <input
                type="text"
                className="px-1 rounded-md outline-none grow dark:bg-slate-900 dark:text-white"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="hidden" />
            {/* Sun Icon */}
            <svg
              className="cursor-pointer fill-current swap-off w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,5.64,17Z..." />
            </svg>
            {/* Moon Icon */}
            <svg
              className="cursor-pointer fill-current swap-on w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14..." />
            </svg>
          </label>

          {/* Auth Buttons */}
          {authUser ? (
            <Logout />
          ) : (
            <div>
              <button
                className="px-3 py-2 text-white duration-300 bg-black rounded-md cursor-pointer hover:bg-slate-800"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
