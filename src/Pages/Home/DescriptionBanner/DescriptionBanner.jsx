import banner from "../../../assets/DescriptionBanner/chef-service.jpg";

const DescriptionBanner = () => {
  return (
    <div
      className="hero mx-auto my-24 bg-fixed"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-center">
        <div className="bg-base-200 p-5 md:p-16 md:m-16">
          <h1 className="mb-5 text-5xl font-bold">Diner Dynasty</h1>
          <p className="mb-5">
            Diner Dynasty is a restaurant that serves a variety of cuisines,
            including Italian, Chinese, Mexican, and American food. We offer a
            wide range of dishes, from classic favorites like pasta and pizza,
            to more exotic options like seafood and steak. Our menu is designed
            to be diverse and inclusive, so that everyone can find something
            they enjoy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBanner;
