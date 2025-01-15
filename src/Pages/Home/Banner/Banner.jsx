import { useRef } from "react";
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

import FirstBanner from "./FirstBanner";
import SecondBanner from "./SecondBanner";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "red",
          "--swiper-pagination-color": "red",
        }}
        // spaceBetween={30}
        centeredSlides={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCreative]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* <div className="relative h-[30rem] w-full">
            <img src={orderbg} className="h-full w-full object-cover" alt="" />
            <div className="absolute inset-0 text-amber-400 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center text-center  px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Order Your Favourite Food
              </h1>
              <p className="text-lg md:text-xl mb-6 font-semibold">
                Delicious meals delivered to your doorstep in minutes. Explore
                our wide range of cuisines.
              </p>
              <Link to="/order/salad">
                <Button>Order Now</Button>
              </Link>
            </div>
          </div> */}
          <FirstBanner />
        </SwiperSlide>
        <SwiperSlide>
          <SecondBanner />
          {/* <div className="relative h-[30rem] w-full">
            <img
              src={reservationbg}
              className="h-full w-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 text-amber-400 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center text-center  px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Reserve Your Table
              </h1>
              <p className="text-lg md:text-xl mb-6 font-semibold">
                Reserve your table for a delightful dining experience. Choose
                from a wide selection of cuisines and enjoy a memorable meal.
              </p>
              <Link to="/dashBoard/reservation">
                <Button>Reserve Now</Button>
              </Link>
            </div>
          </div> */}
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
        </SwiperSlide> */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
