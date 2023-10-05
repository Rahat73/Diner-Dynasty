import { BiSolidDish } from "react-icons/bi";
import {
  FaCalendar,
  FaCalendarCheck,
  FaCommentDots,
  FaEnvelope,
  FaHome,
  FaHouseUser,
  FaShoppingBag,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";
import ActiveLink from "../Components/ActiveLink";
import useCart from "../hooks/useCart";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
  const [cart] = useCart();

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | DashBoard</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
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
              <ActiveLink to={"/dashBoard/myBooking"}>
                <FaCalendarCheck className="text-lg" /> My Booking
              </ActiveLink>
            </li>
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
    </>
  );
};

export default DashBoard;
