import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../../Components/MenuItem";
import SectionHeader from "../../../Components/SectionHeader";
import Button from "../../../Components/Button";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularItems = menu.filter((item) => item.category === "popular");

  return (
    <div className="w-9/12 mx-auto my-40">
      <SectionHeader
        subHeading={"Check it out"}
        heading={"From Our Menu"}
      ></SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {popularItems.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Button className={"my-10 flex justify-center mx-auto"}>
        View Full Menu
      </Button>
    </div>
  );
};

export default PopularMenu;
