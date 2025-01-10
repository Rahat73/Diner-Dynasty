import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { dashboardVariants } from "../DashboardVariants/DashboardVariants";
import { useState } from "react";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [axiosSecure] = useAxiosSecure();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 1048576) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image size too big!",
        footer: "Make sure image size is below 1MB",
      });
    }

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const uploadPromises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      return await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    });

    console.log(uploadPromises);

    Promise.all(uploadPromises)
      .then((responses) => {
        const uploadedImages = responses
          .filter((res) => res.success)
          .map((res) => res.data.display_url);

        if (uploadedImages.length === 0) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image upload failed!",
          });
        }

        const { name, category, price, recipe } = data;
        const newItem = {
          name,
          category,
          price: parseFloat(price),
          recipe,
          images: uploadedImages, // Store array of image URLs
        };

        // Submit the new item with the image URLs to the server
        axiosSecure.post("/menus", newItem).then((res) => {
          if (res.data.insertedId) {
            reset();
            setImageFiles([]); // Clear selected images
            setImagePreviews([]); // Clear previews
            toast.success("A new item has been added");
          }
        });
      })
      .catch((error) => {
        console.error("Image upload failed", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while uploading images!",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Add an Item</title>
      </Helmet>
      <motion.div
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
        className="w-full my-5"
      >
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
                {errors.name?.type === "maxLength" && (
                  <p className="text-sm text-red-400 ml-3">Max Length is 30</p>
                )}
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
                required
                {...register("recipe", { maxLength: 150 })}
              ></textarea>
            </div>
            {/* <div className="form-control w-full col-span-6">
              <label className="label">
                <span className="label-text">Item Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                required
                {...register("image")}
              />
            </div> */}
            <div className="col-span-12">
              <label
                className="flex h-14 w-40 cursor-pointer items-center justify-center rounded-xl border-2 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                multiple
                className="hidden"
                id="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
            <div className="col-span-12">
              {imagePreviews.length > 0 && (
                <div className="flex space-x-2 mb-5">
                  {imagePreviews.map((imageDataUrl) => (
                    <div
                      key={imageDataUrl}
                      className="w-40 h-40 rounded-xl border-2 border-dashed border-default-300 p-2"
                    >
                      <img
                        alt="item"
                        className="w-[8.6rem] h-[8.6rem] object-cover"
                        src={imageDataUrl}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-12 flex justify-center">
              <button>
                <Button>
                  <p className="flex">
                    {"Add Item"} <FaUtensils className="ml-2" />
                  </p>
                </Button>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default AddItem;
