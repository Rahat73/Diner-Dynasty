import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { menuVariants } from "./MenuVariants";
import Cover from "../Shared/Cover/Cover";
import img from "../../assets/menu/banner3.jpg";
import PopularMenu from "../Home/PopularMenu/PopularMenu";

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Menu</title>
      </Helmet>
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Cover
          heading={"Our Menu"}
          subHeading={"Would You Like To Try A Dish?"}
          img={img}
        ></Cover>
        <PopularMenu></PopularMenu>
        <Cover
          heading={"Our Menu"}
          subHeading={"Would You Like To Try A Dish?"}
          img={img}
        ></Cover>
      </motion.div>
    </>
  );
};

export default Menu;
