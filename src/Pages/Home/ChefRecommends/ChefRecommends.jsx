import { useEffect, useState } from "react";
import SectionHeader from "../../../Components/SectionHeader";
import MenuItemCard from "../../../Components/MenuItemCard";

const ChefRecommends = () => {
  const [chefMenu, setChefMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((loadChefMenu) => {
        setChefMenu(loadChefMenu.filter((item) => item.category === "offered"));
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto my-40">
      <SectionHeader
        heading={"Chef Recommends"}
        subHeading={"Should Try"}
      ></SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {chefMenu.map((item) => (
          <MenuItemCard key={item._id} item={item}></MenuItemCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommends;
