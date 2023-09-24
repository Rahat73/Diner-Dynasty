const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div>
      <a className="group relative block h-40 sm:h-48 md:h-56 lg:h-40">
        <span className="absolute inset-0 border-2 border-dashed border-current"></span>

        <div className="relative flex h-full transform items-end border-e-2 border-b-2 border-current bg-base-200 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-4 px-10 w-full flex-col sm:flex-row lg:flex justify-between items-center transition-opacity group-hover:absolute group-hover:opacity-0 ">
            <img
              className="w-32 sm:w-40 lg:w-44 rounded-e-full rounded-b-full "
              src={image}
              alt=""
            />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl text-start">
              {name}
            </h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <div className="flex justify-between">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{name}</h3>
              <p className="mt-4 sm:text-xl text-amber-500 font-bold">
                ${price}
              </p>
            </div>
            <p className="mt-4 text-sm sm:text-base">{recipe}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MenuItem;
