import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { menuVariants } from "./MenuVariants";
import Cover from "../../Shared/Cover/Cover";
import img from "../../../assets/menu/banner3.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import useMenu from "../../../hooks/useMenu";
import SectionHeader from "../../../Components/SectionHeader";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const dessert = menu.filter((item) => item.category === "dessert");
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
        {/* -------------------OFFERED---------------- */}
        <div className="my-20">
          <SectionHeader
            heading={"Today's offer"}
            subHeading={"Don't miss"}
          ></SectionHeader>
          <MenuCategory items={offered} category={"salad"}></MenuCategory>
        </div>
        {/* -------------------SALAD---------------- */}
        <div className="my-20">
          <MenuCategory
            items={salad}
            heading={"Salads"}
            subHeading={
              "Fresh, locally-sourced ingredients, expertly prepared to bring out the best flavors"
            }
            img={saladImg}
            category={"salad"}
          ></MenuCategory>
        </div>
        {/* -------------------SOUP---------------- */}
        <div className="my-20">
          <MenuCategory
            items={soup}
            heading={"Soups"}
            subHeading={
              "Our soups are made with love and care, using only the freshest ingredients. From classic favorites to unique twists, we have a soup to warm your heart and belly."
            }
            img={soupImg}
            category={"soup"}
          ></MenuCategory>
        </div>
        {/* -------------------PIZZAS---------------- */}
        <div className="my-20">
          <MenuCategory
            items={pizza}
            heading={"Pizza"}
            subHeading={
              "Indulge in our delicious pizzas, crafted with the finest ingredients and baked to perfection. From classic Margherita to gourmet options, there's a slice for everyone to enjoy."
            }
            img={pizzaImg}
            category={"pizza"}
          ></MenuCategory>
        </div>
        {/* -------------------DESSERTS---------------- */}
        <div className="my-20">
          <MenuCategory
            items={dessert}
            heading={"Desserts"}
            subHeading={
              "Delicious desserts made with love and care, using only the freshest ingredients. From classic favorites to unique twists, we have a dessert to warm your heart and belly."
            }
            img={dessertImg}
            category={"desserts"}
          ></MenuCategory>
        </div>
      </motion.div>
    </>
  );
};

export default Menu;
