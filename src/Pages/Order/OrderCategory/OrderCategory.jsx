import { motion } from "framer-motion";
import MenuItemCard from "../../../Components/MenuItemCard";
import { tabPanelVariants } from "../Order/OrderVariants";

const OrderCategory = ({ items }) => {
  return (
    <motion.div
      variants={tabPanelVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10"
    >
      {items.map((item) => (
        <MenuItemCard key={item._id} item={item}></MenuItemCard>
      ))}
    </motion.div>
  );
};

export default OrderCategory;
