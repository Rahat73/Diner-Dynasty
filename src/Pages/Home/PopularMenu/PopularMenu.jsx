import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../../Components/MenuItem";
import SectionHeader from "../../../Components/SectionHeader";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularItems = menu.filter((item) => item.category === "popular");

  return (
    <div className="w-11/12 mx-auto my-24">
      <SectionHeader
        subHeading={"Check it out"}
        heading={"From Our Menu"}
      ></SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {popularItems.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={"/menu"}>
        <Button className={"my-10 flex justify-center mx-auto"}>
          View Full Menu
        </Button>
      </Link>
    </div>
  );
};

export default PopularMenu;
