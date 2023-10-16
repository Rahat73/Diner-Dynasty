import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login-Register/Login";
import Register from "../Pages/Login-Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashBoard from "../Layouts/DashBoard";
import MyCart from "../Pages/MyCart/MyCart";
import AdminRoutes from "./AdminRoutes";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AddItem from "../Pages/DashBoard/AddItem/AddItem";
import ManageItems from "../Pages/DashBoard/ManageItems/ManageItems";
import Payment from "../Pages/DashBoard/Payment/Payment";
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome";
import UserHome from "../Pages/DashBoard/UserHome/UserHome";
import NotFound from "../Pages/NotFound/NotFound";
import Reservation from "../Pages/DashBoard/Reservation/Reservation";
import MyBookings from "../Pages/DashBoard/MyBookings/MyBookings";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import AddReview from "../Pages/DashBoard/AddReview/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashBoard",
    element: (
      <PrivateRoutes>
        <DashBoard></DashBoard>
      </PrivateRoutes>
    ),
    children: [
      /////////////////////////////User Routes/////////////////////////////
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "myCart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "addReview",
        element: <AddReview></AddReview>,
      },
      {
        path: "reservation",
        element: <Reservation></Reservation>,
      },
      {
        path: "myBookings",
        element: <MyBookings></MyBookings>,
      },
      /////////////////////////////Admin Routes/////////////////////////////
      {
        path: "adminHome",
        element: (
          <AdminRoutes>
            <AdminHome></AdminHome>
          </AdminRoutes>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "addItem",
        element: (
          <AdminRoutes>
            <AddItem></AddItem>
          </AdminRoutes>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoutes>
            <ManageItems></ManageItems>
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
