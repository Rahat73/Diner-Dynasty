import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Payment</title>
      </Helmet>
      <div className="w-full">
        <SectionHeader
          heading={"Payment"}
          subHeading={"Please Process"}
        ></SectionHeader>
      </div>
      <div className="bg-base-200 p-10 w-11/12 max-h-[30rem] overflow-auto mx-auto border border-current">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} cart={cart} />
        </Elements>
      </div>
    </>
  );
};

export default Payment;
