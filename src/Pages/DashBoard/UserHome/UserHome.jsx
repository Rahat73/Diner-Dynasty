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

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [cart] = useCart();
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
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full mx-auto my-5">
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
              <div className="stat-value">2</div>
            </div>
          </div>

          <div className="stat flex justify-between lg:justify-evenly items-center">
            <FaDollarSign className="text-5xl" />
            <div>
              <div className="stat-title">Spendings</div>
              <div className="stat-value">100</div>
            </div>
          </div>

          <div className="stat flex justify-between lg:justify-evenly items-center">
            <BiSolidDish className="text-6xl" />
            <div>
              <div className="stat-title">Items Bought</div>
              <div className="stat-value">4</div>
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
              <p>Orders: 2</p>
              <p>Bookings: 2</p>
              <p>Reviews: 2</p>
              <p>Cart: {cart.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
