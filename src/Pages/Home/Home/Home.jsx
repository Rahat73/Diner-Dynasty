import Banner from "../Banner/Banner";
import CallUsBanner from "../CallUsBanner/CallUsBanner";
import CategorySlider from "../CategorySlider/CategorySlider";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import DescriptionBanner from "../DescriptionBanner/DescriptionBanner";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CategorySlider></CategorySlider>
      <DescriptionBanner></DescriptionBanner>
      <PopularMenu></PopularMenu>
      <CallUsBanner></CallUsBanner>
      <ChefRecommends></ChefRecommends>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
