import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { themeChange } from "theme-change";
import ActiveLink from "../../../Components/ActiveLink";
import { BiSolidDish } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

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

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };

  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const navbarItems = (
    <>
      <li>
        <ActiveLink to={"/"}>Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to={"/order/salad"}>Order Now</ActiveLink>
      </li>
      {/* <li>
        <ActiveLink to={"/menu"}>Our Menu</ActiveLink>
      </li> */}
      <li>
        <ActiveLink to={"/contactUs"}>Contact Us</ActiveLink>
      </li>

      {user ? (
        <li>
          <ActiveLink
            to={isAdmin ? "/dashBoard/adminHome" : "/dashBoard/userHome"}
          >
            Dashboard
          </ActiveLink>
          <Link
            to={"dashBoard/myCart"}
            className="flex justify-start items-center md:hidden"
          >
            <FaShoppingCart className="text-xl" />
            <div className="badge badge-secondary">
              {`+ ${cart?.length}` || +0}
            </div>
          </Link>
          <button onClick={handleLogOut} className="block md:hidden">
            Log Out
          </button>
        </li>
      ) : (
        <li>
          <Link to={"/login"}>
            <button className="block md:hidden">Log In</button>
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`navbar bg-red-700 pl-10 pr-14 sticky top-0 z-10 font-semibold text-neutral-content ${
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
        <Link
          to={"/"}
          className="md:mx-5 bg-gradient-to-r from-red-400 via-amber-500 to-green-300 bg-clip-text text-transparent flex justify-center items-center space-x-3"
        >
          <BiSolidDish className="text-7xl text-amber-500"></BiSolidDish>
          <div>
            <h1 className="text-xl md:text-3xl font-bold">Diner Dynasty</h1>
            <p className="text-sm md:text-lg font-bold">Restaurant</p>
          </div>
        </Link>
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
        {user ? (
          <>
            <Link
              to={"dashBoard/myCart"}
              className="btn btn-ghost ml-4 hidden md:flex"
            >
              <FaShoppingCart className="text-xl" />
              <div className="badge badge-secondary">
                {`+ ${cart?.length}` || +0}
              </div>
            </Link>
            <div
              className="tooltip tooltip-left ml-4 flex"
              data-tip={user.displayName}
            >
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <ActiveLink
                      to={
                        isAdmin ? "/dashBoard/adminHome" : "/dashBoard/userHome"
                      }
                    >
                      Dashboard
                    </ActiveLink>
                  </li>
                  <li>
                    <button onClick={handleLogOut} className="hidden md:block">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-ghost mx-3 hidden md:block">
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
