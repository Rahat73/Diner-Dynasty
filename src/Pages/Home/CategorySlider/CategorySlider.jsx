// import React from 'react';

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "../../../assets/CategorySlider/slide1.jpg";
import slide2 from "../../../assets/CategorySlider/slide2.jpg";
import slide3 from "../../../assets/CategorySlider/slide3.jpg";
import slide4 from "../../../assets/CategorySlider/slide4.jpg";
import slide5 from "../../../assets/CategorySlider/slide5.jpg";
import SectionHeader from "../../../Components/SectionHeader";

const CategorySlider = () => {
  return (
    <div className="w-11/12 mx-auto my-24">
      <SectionHeader
        subHeading={"From 11:00am to 10:00pm"}
        heading={"Order Online"}
      ></SectionHeader>
      <div className="w-3/4 mx-auto sm:w-full">
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
              slidesPerView: 4,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <img className="w-full" src={slide1} alt="" />
              <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
                Salads
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img className="w-full" src={slide2} alt="" />
              <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
                Pizzas
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img className="w-full" src={slide3} alt="" />
              <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
                Soups
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img className="w-full" src={slide4} alt="" />
              <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
                Deserts
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img className="w-full" src={slide5} alt="" />
              <h1 className="text-3xl text-neutral-content text-center absolute inset-x-0 bottom-0 bg-red-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm">
                Salads
              </h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
