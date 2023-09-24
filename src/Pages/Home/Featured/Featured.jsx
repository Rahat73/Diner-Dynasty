import Button from "../../../Components/Button";
import SectionHeader from "../../../Components/SectionHeader";
import featuredImg from "../../../assets/Featured/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-container my-40 text-neutral-content">
      <div className="bg-black bg-opacity-60 w-full h-full px-20 py-28">
        <SectionHeader
          heading={"From Our Menu"}
          subHeading={"Check It Out"}
        ></SectionHeader>
        <div className="flex flex-col md:flex-row  items-center justify-center space-x-10 lg:w-10/12 mx-auto">
          <img className="w-96" src={featuredImg} alt="" />
          <div className="my-5">
            <p>December 18, 2023</p>
            <p>WHERE CAN I GET SOME?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim,
              minima commodi laborum ab fuga harum sapiente dolores nulla,
              maiores aperiam optio perspiciatis sed, saepe est! Nostrum
              reprehenderit recusandae saepe!
            </p>
            <Button className={"my-4"}>Read More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
