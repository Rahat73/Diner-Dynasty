import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { themeChange } from "theme-change";
import ActiveLink from "../../../Components/ActiveLink";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  ///////////////////////////// NavbarChange ////////////////////////////
  const [navbarChange, setNavbarChange] = useState(false);
  const [navbarHide, setNavbarHide] = useState(false);
  const [prevScroll, setPrevScroll] = useState();
  const { scrollY } = useScroll();

  //Checking scolled position to determine whether to change navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log(`prev:${prevScroll}, latest:${latest}`);
    if (latest > 100) {
      setNavbarChange(true);
    } else {
      setNavbarChange(false);
    }
    if (latest > 600 && prevScroll < latest) {
      setNavbarHide(true);
    } else {
      setNavbarHide(false);
    }
    setPrevScroll(latest);
  });
  ///////////////////////////// NavbarChange ////////////////////////////

  ///////////////////////////// Theme Toggle ////////////////////////////
  const [isDarkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "luxury" ? true : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode); ///////Changes it's theme
    if (isDarkMode) {
      //If it's already dark then change to light
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "luxury");
    }
  };
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, [isDarkMode]);
  ///////////////////////////// Theme Toggle ////////////////////////////

  const navbarItems = (
    <>
      <li>
        <ActiveLink to={"/"}>Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to={"/menu"}>Our Menu</ActiveLink>
      </li>
      <li>
        <ActiveLink to={"/order/salad"}>Order</ActiveLink>
      </li>
      <li>
        <ActiveLink to={"/login"}>Login</ActiveLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar bg-red-700 sticky top-0 z-10 py-0 font-semibold text-neutral-content ${
        navbarChange &&
        `bg-red-950 bg-opacity-70 bg-clip-padding backdrop-filter backdrop-blur-sm`
      } ${navbarHide && `opacity-0`}`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbarItems}
          </ul>
        </div>
        <a className=" md:w-1/2">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" menu-horizontal space-x-5 px-1">{navbarItems}</ul>
      </div>
      <div className="navbar-end">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={35}
        />
        <a className="btn mx-3">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
