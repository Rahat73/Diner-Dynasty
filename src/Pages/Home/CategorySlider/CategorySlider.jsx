// import React from 'react';

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "../../../assets/CategorySlider/slide1.jpg";
import slide2 from "../../../assets/CategorySlider/slide2.jpg";
import slide3 from "../../../assets/CategorySlider/slide3.jpg";
import slide4 from "../../../assets/CategorySlider/slide4.jpg";
import slide5 from "../../../assets/CategorySlider/slide5.jpg";

const CategorySlider = () => {
  return (
    <div className="w-9/12 mx-auto my-16">
      <div className="w-1/2 mx-auto">
        <h1 className="italic text-center font-semibold text-amber-400">
          --- From 11:00am to 10:00pm ---
        </h1>

        <h1 className="text-3xl font-semibold text-center py-3 border-y-4 mb-5">
          Order Online
        </h1>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img src={slide1} alt="" />
            <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
              Salads
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={slide2} alt="" />
            <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
              Pizzas
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={slide3} alt="" />
            <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
              Soups
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={slide4} alt="" />
            <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
              Deserts
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={slide5} alt="" />
            <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
              Salads
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategorySlider;
