import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import {
  FaCalendarCheck,
  FaDollarSign,
  FaEnvelope,
  FaShoppingCart,
} from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import useBookings from "../../../hooks/useBookings";
import usePayment from "../../../hooks/usePayment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [cart] = useCart();
  const [bookings] = useBookings();
  const [payments] = usePayment();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: user != null,
    queryFn: async () => {
      const res = await axios(`http://localhost:5000/reviews/${user?.email}`);
      return res.data;
    },
  });

  const totalItems = payments.reduce((total, item) => total + item.quantity, 0);
  const totalSpent = payments.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | User Home</title>
      </Helmet>
      <div className="w-full">
        <SectionHeader
          heading={"User Home"}
          subHeading={"Welcome to"}
        ></SectionHeader>
      </div>
      <div className="bg-base-200 p-10 w-11/12 lg:max-h-[34rem] overflow-auto mx-auto my-4 border border-current">
        <h1 className="text-2xl">
          Hi,{" "}
          <span className=" font-bold text-amber-500">{user?.displayName}</span>
        </h1>
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full mx-auto">
          <div className="stat flex justify-between lg:justify-evenly items-center">
            <FaShoppingCart className="text-6xl" />
            <div>
              <div className="stat-title">Cart</div>
              <div className="stat-value">{cart.length}</div>
            </div>
          </div>

          <div className="stat flex justify-between lg:justify-evenly items-center">
            <FaCalendarCheck className="text-5xl" />
            <div>
              <div className="stat-title">Bookings</div>
              <div className="stat-value">{bookings.length}</div>
            </div>
          </div>

          <div className="stat flex justify-between lg:justify-evenly items-center">
            <FaDollarSign className="text-5xl" />
            <div>
              <div className="stat-title">Spendings</div>
              <div className="stat-value">{totalSpent}</div>
            </div>
          </div>

          <div className="stat flex justify-between lg:justify-evenly items-center">
            <BiSolidDish className="text-6xl" />
            <div>
              <div className="stat-title">Items Bought</div>
              <div className="stat-value">{totalItems}</div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-10 my-10">
          <div className=" col-span-5 flex flex-col justify-center items-center space-y-3">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-32">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="user" />
                ) : (
                  <span className="text-3xl">{user?.displayName[0]}</span>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="text-lg flex items-center">
              <FaEnvelope className="mx-3" /> {user?.email}
            </p>
          </div>
          <div className="col-span-2 hidden lg:flex divider divider-horizontal"></div>
          <div className="col-span-5  flex flex-col justify-center items-start space-y-3">
            <h2 className="text-2xl font-bold">Your Activities</h2>
            <div>
              <p>Orders: {payments.length}</p>
              <p>Bookings: {bookings.length}</p>
              <p>Reviews: {reviews.length}</p>
              <p>Cart: {cart.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
