import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "../../../Components/SectionHeader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://diner-dynasty-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((loadReviews) => setReviews(loadReviews));
  }, []);

  return (
    <div className="w-11/12 mx-auto my-24">
      <SectionHeader
        heading={"Testimonials"}
        subHeading={"What Our Clients Say"}
      ></SectionHeader>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="mx-10 md:mx-28 my-5 text-center space-y-5 bg-base-200 p-5">
                <Rating
                  className="w-full mx-auto"
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <FaQuoteLeft className="w-full mx-auto" size={"3rem"} />
                <p>{review.details}</p>
                <h3 className="text-2xl font-bold text-amber-500">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
