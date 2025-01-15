import { FaArrowRight } from "react-icons/fa6";

import cart from "../../../assets/Banner/person.png";
import reservationbg from "../../../assets/menu/banner3.jpg";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button";

const SecondBanner = () => {
  return (
    <div className="relative h-[34rem] w-full">
      <img src={reservationbg} className="h-full w-full object-cover" alt="" />
      <div className="absolute inset-0 text-amber-300 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center text-center  px-4">
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="relative z-10 flex justify-center">
                <img src={cart} alt="Cart Items" />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Reserve Your Table
                </h1>
                <p className="text-default-600 text-lg mb-8">
                  Reserve your table for a delightful dining experience. Choose
                  from a wide selection of cuisines and enjoy a memorable meal.
                </p>
                <div className="space-x-4">
                  <Link to="/dashBoard/reservation">
                    <Button>
                      <div className={"flex items-center justify-end"}>
                        Reserve Now
                        <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
