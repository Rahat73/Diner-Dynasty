import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import Banner from "../Banner/Banner";
import CallUsBanner from "../CallUsBanner/CallUsBanner";
import CategorySlider from "../CategorySlider/CategorySlider";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import DescriptionBanner from "../DescriptionBanner/DescriptionBanner";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import { homeComponentsVariants, homeVariants } from "./HomeVariants";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Diner Dynasty | Home</title>
      </Helmet>
      <motion.div
        variants={homeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Banner></Banner>

        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <DescriptionBanner></DescriptionBanner>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <CategorySlider></CategorySlider>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <PopularMenu></PopularMenu>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <CallUsBanner></CallUsBanner>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <ChefRecommends></ChefRecommends>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Featured></Featured>
        </motion.div>
        <motion.div
          variants={homeComponentsVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Testimonials></Testimonials>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
