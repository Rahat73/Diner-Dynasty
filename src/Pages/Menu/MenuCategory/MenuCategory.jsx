import { Link } from "react-router-dom";
import Button from "../../../Components/Button";
import MenuItem from "../../../Components/MenuItem";
import Cover from "../../Shared/Cover/Cover";

const MenuCategory = ({ items, heading, subHeading, img, category }) => {
  return (
    <>
      {heading && (
        <Cover heading={heading} subHeading={subHeading} img={img}></Cover>
      )}
      <div className="w-9/12 mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
        <Link to={`/order/${category}`}>
          <Button className={"my-10 flex justify-center mx-auto"}>
            Order Your Favourite Food
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
