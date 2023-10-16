import { FaTrash } from "react-icons/fa";
import Button from "../../Components/Button";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Removed!",
                "Item has been removed from the cart.",
                "success"
              );
            } else {
              Swal.fire("Oops!", "Something went wrong...", "error");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | My Cart</title>
      </Helmet>
      <SectionHeader heading={"My Cart"} subHeading={"Manage"}></SectionHeader>
      <div className="bg-base-200 p-10 w-11/12 lg:max-h-[30rem] overflow-auto mx-auto border border-current">
        <div className="flex justify-evenly items-center">
          <h1 className="text-2xl font-semibold">
            Total Orders: {cart.length}
          </h1>
          <h1 className="text-2xl font-semibold">Total Price: ${total}</h1>
          <Link to={"/dashBoard/payment"}>
            <Button>Pay</Button>
          </Link>
        </div>
        <div className="overflow-x-auto my-10">
          {cart.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="Food" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>$ {item.price}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrash className="text-lg text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-4xl text-center my-20">
              No items in the cart
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCart;
