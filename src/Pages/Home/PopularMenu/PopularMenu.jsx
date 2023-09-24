import { useEffect, useState } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionHeader from "../../../Components/SectionHeader";

const PopularMenu = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((items) => {
        const loadPopularItems = items.filter(
          (item) => item.category === "popular"
        );
        setPopularItems(loadPopularItems);
      });
  }, []);
  return (
    <div className="w-9/12 mx-auto my-16">
      <SectionHeader
        subHeading={"Check it out"}
        heading={"From Our Menu"}
      ></SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {popularItems.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <button>View More</button>
    </div>
  );
};

export default PopularMenu;
