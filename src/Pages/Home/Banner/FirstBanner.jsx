import { FaArrowRight } from "react-icons/fa6";

import { Link } from "react-router-dom";
import banner from "../../../assets/DescriptionBanner/chef-service.jpg";
import Button from "../../../Components/Button";
import orderBg from "../../../assets/shop/banner2.jpg";

const FirstBanner = () => {
  return (
    <div className="relative h-[34rem] w-full">
      <img src={orderBg} className="h-full w-full object-cover" alt="" />
      <div className="py-3 absolute inset-0 text-amber-300 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center text-center  px-4">
        <div className="relative overflow-hidden mx-3 md:mx-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="text-center md:text-right">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Order Your Favourite Food
                </h1>
                <p className="text-default-600 text-lg mb-8">
                  Delicious meals delivered to your doorstep in minutes. Explore
                  our wide range of cuisines.
                </p>
                <div className="space-x-4">
                  <Link to="/order/salad">
                    <Button>
                      <div className={"flex items-center justify-end"}>
                        Order Now
                        <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative z-10 flex justify-center">
                <img
                  src={banner}
                  alt="Cart Items"
                  className="w-96 h-96 object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstBanner;
