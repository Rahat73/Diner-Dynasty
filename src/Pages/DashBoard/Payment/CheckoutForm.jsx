import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./CheckoutForm.css";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("[error]", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        footer: "Please fill the form with valid information",
      });
    } else {
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${confirmError.message}`,
        footer: '<a href="">Please reload the page</a>',
      });
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;

      const paymentInfo = {
        transactionId,
        name: user?.displayName,
        email: user?.email,
        price,
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
        itemNames: cart.map((item) => item.name),
        status: "pending",
        phone: event.target.phone.value,
        address: event.target.address.value,
      };

      axiosSecure.post("/payments", paymentInfo).then((res) => {
        if (
          res.data.insertResult.insertedId &&
          res.data.deletedResult.deletedCount > 0
        ) {
          Swal.fire(
            "Transaction Complete!",
            `Transaction ID: ${transactionId}`,
            "success"
          );
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="form-control max-w-md">
        <label className="label">
          <span className="label-text">Phone Number*</span>
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="0123456789"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control max-w-md">
        <label className="label">
          <span className="label-text">Address*</span>
        </label>
        <input
          name="address"
          type="text"
          placeholder="House, Road, Area, City"
          className="input input-bordered w-full"
          required
        />
      </div>
      <motion.button
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ repeat: Infinity }}
        className="my-4 btn btn-outline btn-sm btn-wide"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </motion.button>
    </form>
  );
};

export default CheckoutForm;
