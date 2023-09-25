import banner from "../../../assets/DescriptionBanner/chef-service.jpg";

const DescriptionBanner = () => {
  return (
    <div
      className="hero w-9/12 mx-auto my-40 bg-fixed"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-center">
        <div className="bg-base-200 p-5 md:p-16 md:m-16">
          <h1 className="mb-5 text-5xl font-bold">Diner Dynasty</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi. Provident cupiditate voluptatem et in. Quaerat fugiat ut
            assumenda excepturi exercitationem quasi. In deleniti eaque aut
            repudiandae et a id nisi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBanner;
