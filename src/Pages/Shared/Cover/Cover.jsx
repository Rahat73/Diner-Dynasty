import { Parallax } from "react-parallax";

const Cover = ({ heading, subHeading, img }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="banner"
      strength={-200}
    >
      <div className="text-center text-neutral-content flex items-center justify-center py-10 md:py-28">
        <div className="bg-black bg-opacity-60 w-9/12 py-28 flex flex-col items-center justify-center">
          <h1 className=" text-5xl font-bold">{heading}</h1>
          <p className="">{subHeading}</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
