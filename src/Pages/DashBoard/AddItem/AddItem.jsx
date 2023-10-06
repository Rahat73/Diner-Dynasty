import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.image[0].size > 1048576) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image size too big!",
        footer: "Make sure image size is below 1MB",
      });
    }
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;
          const { name, category, price, recipe } = data;
          const newItem = {
            name,
            category,
            price: parseFloat(price),
            recipe,
            image: imgURL,
          };
          axiosSecure.post("/menus", newItem).then((res) => {
            if (res.data.insertedId) {
              reset();
              toast.success("A new item has been added");
            }
          });
        }
      });
  };
  console.log(errors);

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Add an Item</title>
      </Helmet>
      <SectionHeader
        heading={"Add an Item"}
        subHeading={"What's New"}
      ></SectionHeader>
      <div className="bg-base-200 p-10 w-11/12 mx-auto border border-current ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 md:space-y-0 md:grid grid-cols-12 gap-3"
        >
          <div className="form-control w-full col-span-12">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. chicken tanduri"
              className="input input-bordered w-full"
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
              defaultValue="Select a Category"
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
            </label>
            <input
              type="number"
              placeholder="$$"
              className="input input-bordered w-full"
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
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="e.g. ingredients, flavours..."
              required
              {...register("recipe", { maxLength: 150 })}
            ></textarea>
          </div>
          <div className="form-control w-full col-span-6">
            <label className="label">
              <span className="label-text">Item Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              required
              {...register("image")}
            />
          </div>
          <button className="col-span-12">
            <Button>
              <p className="flex">
                {"Add Item"} <FaUtensils className="ml-2" />
              </p>
            </Button>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItem;
