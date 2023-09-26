import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { orderVariants } from "./OrderVariants";
import useMenu from "../../../hooks/useMenu";
import Cover from "../../Shared/Cover/Cover";
import orderImg from "../../../assets/shop/banner2.jpg";
// import "./Order.css";
import "react-tabs/style/react-tabs.css";
import OrderCategory from "../OrderCategory/OrderCategory";
import { useEffect } from "react";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [menu] = useMenu();
  //   const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const dessert = menu.filter((item) => item.category === "dessert");
  salad.key = "salad";
  soup.key = "soup";
  pizza.key = "pizza";
  dessert.key = "dessert";
  const categories = [salad, soup, pizza, dessert];

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Menu</title>
      </Helmet>
      <motion.div
        variants={orderVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Cover
          img={orderImg}
          heading={"Order Food"}
          subHeading={
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque explicabo mollitia eos accusantium, eveniet nisi sunt ab. Sequi, quidem a!"
          }
        ></Cover>
        <div className="w-9/12 mx-auto my-10">
          <Tabs>
            <TabList>
              {categories.map((category) => (
                <Tab key={category.key}>
                  <h1 className="text-lg font-bold">{category.key}</h1>
                </Tab>
              ))}
            </TabList>

            {categories.map((category) => (
              <TabPanel key={category.key}>
                <OrderCategory items={category}></OrderCategory>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </motion.div>
    </>
  );
};

export default Order;
