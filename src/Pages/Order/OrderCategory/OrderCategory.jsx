import { motion } from "framer-motion";
import MenuItemCard from "../../../Components/MenuItemCard";
import { tabPanelVariants } from "../Order/OrderVariants";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const OrderCategory = ({ items }) => {
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <motion.div
        variants={tabPanelVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10"
      >
        {currentItems &&
          currentItems.map((item) => (
            <motion.div variants={tabPanelVariants} key={item._id}>
              <MenuItemCard item={item}></MenuItemCard>
            </motion.div>
          ))}
      </motion.div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className="flex justify-center items-center space-x-8"
        activeClassName="font-bold text-amber-500 text-xl"
        // pageClassName="btn btn-ghost text-lg"
        // previousClassName="btn btn-ghost text-lg"
        // nextClassName="btn btn-ghost text-lg"
        // // disabledClassName="btn btn-disabled"
      />
    </div>
  );
};

export default OrderCategory;
