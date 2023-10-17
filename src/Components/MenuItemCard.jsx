import { useContext } from "react";
import Button from "./Button";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const MenuItemCard = ({ item }) => {
  const { _id, name, recipe, image, price } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleItem = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        image,
        price,
        userEmail: user.email,
      };
      fetch("https://diner-dynasty-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success(
              <p>
                <span className="font-semibold">{item.name}</span> added to cart
              </p>
            );
            refetch();
          }
        });
    } else {
      Swal.fire({
        title: "Login First",
        text: "Please login to add product to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <>
      <div className="group relative block h-72 sm:h-80 lg:h-76">
        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

        <div className="relative flex h-full transform items-end border-2 border-current bg-base-200 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img src={image} alt="" />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
            <h3 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h3>
            <p className="mt-4 text-sm sm:text-base">{recipe}</p>
            <p className="mt-4 sm:text-xl text-amber-500 font-bold">${price}</p>
            <button onClick={() => handleItem(item)}>
              <Button onclick className={"mt-4"}>
                Add to cart
              </Button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItemCard;
