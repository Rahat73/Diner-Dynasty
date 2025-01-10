import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useCart from "../hooks/useCart";

const MenuItem = ({ item }) => {
  const { _id, name, recipe, images, price } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleItem = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        image: images[0],
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
    <div>
      <a className="group relative block h-44 sm:h-48 md:h-56 lg:h-44">
        <span className="absolute inset-0 border-2 border-dashed border-current"></span>

        <div className="relative flex h-full transform items-end border-e-2 border-b-2 border-current bg-base-200 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 px-10 w-full flex-col sm:flex-row lg:flex justify-between items-center transition-opacity group-hover:absolute group-hover:opacity-0 ">
            <img
              className="w-28 sm:w-40 lg:w-44 rounded-e-full rounded-b-full "
              src={images?.[0]}
              alt=""
            />
            <h2 className="mx-4 text-end text-xl font-medium sm:text-2xl">
              {name}
            </h2>
          </div>

          <div className="absolute pb-1 px-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h3>
              <p className="mt-4 sm:text-xl text-amber-500 font-bold">
                ${price}
              </p>
            </div>
            <p className="mt-4 text-sm sm:text-base">{recipe}</p>
            <div className="flex justify-end items-center space-x-3">
              <button>
                <Link to={`/menu/${_id}`}>View Details</Link>
              </button>
              <button onClick={() => handleItem(item)}>
                <Button onclick>Add to cart</Button>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MenuItem;
