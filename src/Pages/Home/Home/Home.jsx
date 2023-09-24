import Banner from "../Banner/Banner";
import CategorySlider from "../CategorySlider/CategorySlider";
import DescriptionBanner from "../DescriptionBanner/DescriptionBanner";
import PopularMenu from "../PopularMenu/PopularMenu";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CategorySlider></CategorySlider>
      <DescriptionBanner></DescriptionBanner>
      <PopularMenu></PopularMenu>
    </div>
  );
};

export default Home;
