import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useMenu from "../../../hooks/useMenu";

const EditItem = ({ item }) => {
  const [axiosSecure] = useAxiosSecure();
  const [, refetch] = useMenu();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: item.name,
      category: item.category,
      price: item.price,
      recipe: item.recipe,
      image: item.image,
    },
  });
  useEffect(() => {
    reset({
      name: item.name,
      category: item.category,
      price: item.price,
      recipe: item.recipe,
      image: item.image,
    });
  }, [item, reset]);

  const onSubmit = (data) => {
    const { name, category, price, recipe, image } = data;
    const updatedItem = {
      name,
      category,
      price: parseFloat(price),
      recipe,
      image,
    };
    axiosSecure.patch(`/menus/${item._id}`, updatedItem).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Item info has been updated!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div>
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Edit item</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-0 md:grid grid-cols-12 gap-3"
          >
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text">Recipe Name*</span>
                {errors.name?.type === "maxLength" && (
                  <p className="text-sm text-red-400 ml-3">Max Length is 30</p>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. chicken tanduri"
                className="input input-bordered w-full"
                // defaultValue={item.name}
                required
                {...register("name", { maxLength: 30 })}
              />
            </div>
            <div className="form-control w-full col-span-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                className="select select-bordered w-full"
                // defaultValue={item.category}
                required
                {...register("category")}
              >
                <option disabled>Select a Category</option>
                <option>salad</option>
                <option>soup</option>
                <option>pizza</option>
                <option>dessert</option>
                <option>drinks</option>
              </select>
            </div>
            <div className="form-control w-full col-span-6">
              <label className="label">
                <span className="label-text">Price*</span>
                {errors.price?.type === "min" && (
                  <p className="text-xs text-red-400 ml-3">
                    Price range is 1-100
                  </p>
                )}
                {errors.price?.type === "max" && (
                  <p className="text-xs text-red-400 ml-3">
                    Price range is 1-100
                  </p>
                )}
              </label>
              <input
                type="number"
                placeholder="$$"
                className="input input-bordered w-full"
                // defaultValue={item.price}
                step="0.1"
                required
                {...register("price", {
                  max: 1000,
                  min: 1,
                })}
              />
            </div>
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text">Recipe Details*</span>
                {errors.recipe?.type === "maxLength" && (
                  <p className="text-xs text-red-400 ml-3">Max Length is 150</p>
                )}
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="e.g. ingredients, flavours..."
                // defaultValue={item.recipe}
                required
                {...register("recipe", { maxLength: 150 })}
              ></textarea>
            </div>
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text">ImageURL*</span>
              </label>
              <input
                type="url"
                placeholder="Paste image url"
                className="input input-bordered w-full"
                // defaultValue={item.image}
                required
                {...register("image")}
              />
            </div>
            <input
              type="submit"
              className="btn btn-outline col-span-12 w-1/2 mx-auto"
              value={"Update"}
            />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditItem;
