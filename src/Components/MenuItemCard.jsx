import Button from "./Button";

const MenuItemCard = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <>
      <div className="group relative block h-72 sm:h-80 lg:h-76">
        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

        <div className="relative flex h-full transform items-end border-2 border-current bg-base-200 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img src={image} alt="" />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
            <h3 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h3>
            <p className="mt-4 text-sm sm:text-base">{recipe}</p>
            <p className="mt-4 sm:text-xl text-amber-500 font-bold">${price}</p>
            <Button className={"mt-4"}>Add to cart</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItemCard;
