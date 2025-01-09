import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useMenuDetails from "../../../hooks/useMenuDetails";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Button from "../../../Components/Button";
import MenuItemCard from "../../../Components/MenuItemCard";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useMenu from "../../../hooks/useMenu";

const MenuDetails = () => {
  const { id } = useParams();
  const [menu] = useMenuDetails({ id });

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleItem = () => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: menu?._id,
        name: menu?.name,
        image: menu?.image,
        price: menu?.price,
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
                <span className="font-semibold">{menu.name}</span> added to cart
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

  const [recommended] = useMenu();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
        <div>
          {/* Main Swiper */}
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            <SwiperSlide>
              <img
                src={menu?.image}
                alt={menu?.name}
                className="w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4"
          >
            <SwiperSlide>
              <img src={menu?.image} alt={menu?.name} className="w-full" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{menu?.name}</h1>
          <p className="text-lg mb-2">
            <strong>Category:</strong> {menu?.category}
          </p>
          <p className="text-lg mb-4">
            <strong>Price:</strong> ${menu?.price.toFixed(2)}
          </p>
          <p className="mb-4">
            <strong>Recipe:</strong> {menu?.recipe}
          </p>
          <div onClick={() => handleItem()}>
            <Button className="">Add to cart</Button>
          </div>
        </div>
      </div>
      <div className="w-11/12 my-16 mx-auto ">
        <h1 className="text-3xl font-bold mb-4">Similar Items</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {recommended
            .filter((item) => item?.category === menu?.category)
            .slice(0, 3)
            .map((item) => (
              <MenuItemCard key={item._id} item={item}></MenuItemCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
