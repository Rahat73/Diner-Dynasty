import { Link } from "react-router-dom";
import Button from "../../../Components/Button";
import SectionHeader from "../../../Components/SectionHeader";
import featuredImg from "../../../assets/Featured/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-container my-40 text-neutral-content">
      <div className="bg-black bg-opacity-80 w-full h-full px-20 py-28">
        <SectionHeader
          heading={"Make Reservation"}
          subHeading={"Check It Out"}
        ></SectionHeader>
        <div className="flex flex-col md:flex-row  items-center justify-center space-x-10 lg:w-10/12 mx-auto">
          <img className="w-96" src={featuredImg} alt="" />
          <div className="my-5">
            <p>WHERE CAN I GET SOME?</p>
            <p>
              The Restraunt is a place where you can enjoy a variety of
              delicious food. We have a wide range of menu items, from burgers
              to salads, sandwiches to pasta, and much more. Our chefs are
              experienced and skilled, and they use only the freshest
              ingredients to prepare your meal. We have a comfortable and
              inviting atmosphere, and our staff is friendly and attentive. So
              come on down and give us a try. We know you&apos;ll enjoy it!
            </p>
            <Button className={"my-4"}>
              <Link to="/dashBoard/reservation">Reserve</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
