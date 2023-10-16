import { BiSolidBowlHot, BiSolidDish } from "react-icons/bi";
import {
  FaBars,
  FaBook,
  FaCalendar,
  FaCalendarCheck,
  FaCommentDots,
  FaEnvelope,
  FaHome,
  FaHouseUser,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import ActiveLink from "../Components/ActiveLink";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          className=" drawer-button lg:hidden w-full my-5 ml-10"
          htmlFor="my-drawer-2"
        >
          <FaBars className="text-2xl cursor-pointer" />
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-red-700 text-neutral-content space-y-2 font-semibold">
          {/* Sidebar content here */}
          <Link
            to={"/"}
            className="my-5 bg-gradient-to-r from-red-400 via-amber-500 to-green-300 bg-clip-text text-transparent flex justify-start items-center space-x-3"
          >
            <BiSolidDish className="text-5xl text-amber-500"></BiSolidDish>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Diner Dynasty</h1>
              <p className="text-sm md:text-lg font-bold">Restaurant</p>
            </div>
          </Link>
          {isAdmin ? (
            <>
              <li>
                <ActiveLink to={"/dashBoard/adminHome"}>
                  <FaHouseUser className="text-lg" /> Admin Home
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/addItem"}>
                  <FaUtensils className="text-lg" /> Add an Item
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/manageItems"}>
                  <BiSolidBowlHot className="text-lg" /> Manage Items
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/manageBookings"}>
                  <FaBook className="text-lg" /> Manage Bookings
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/allUsers"}>
                  <FaUsers className="text-lg" />
                  All Users
                </ActiveLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <ActiveLink to={"/dashBoard/userHome"}>
                  <FaHouseUser className="text-lg" /> User Home
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/reservation"}>
                  <FaCalendar className="text-lg" /> Reservation
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/paymentHistory"}>
                  <FaWallet className="text-lg" /> Payment History
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/myCart"}>
                  <FaShoppingCart className="text-lg" /> My Cart
                  <span className="badge badge-secondary">
                    {`+ ${cart?.length}` || +0}
                  </span>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/addReview"}>
                  <FaCommentDots className="text-lg" /> Add Review
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to={"/dashBoard/myBookings"}>
                  <FaCalendarCheck className="text-lg" /> My Bookings
                </ActiveLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <ActiveLink to={"/"}>
              <FaHome className="text-lg" /> Home
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to={"/menu"}>
              <BiSolidDish className="text-lg" /> Our Menu
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to={"/order/salad"}>
              <FaShoppingBag className="text-lg" /> Order
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to={"/contactUs"}>
              <FaEnvelope className="text-lg" /> Contact Us
            </ActiveLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
