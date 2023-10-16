import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import Button from "../../../Components/Button";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.name = user?.displayName;
    data.email = user?.email;
    axiosSecure.post(`/reviews`, data).then((res) => {
      if (res.data.insertedId) {
        reset();
        toast.success("Your review has been submitted successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Add Review</title>
      </Helmet>
      <SectionHeader
        heading={"Add Review"}
        subHeading={"Give Us Feedback"}
      ></SectionHeader>
      <div className="bg-base-200 p-10 w-11/12 mx-auto border border-current">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="w-1/5 mx-auto">
            <div
              id="rating_label"
              className="text-2xl font-semibold text-center"
            >
              Rate Us
            </div>
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  value={value}
                  isRequired
                  onChange={onChange}
                  visibleLabelId="rating_label"
                  onBlur={onBlur}
                />
              )}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Which recipe did you like most?
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Prosciutto e funghi"
              className="input input-bordered"
              {...register("recipeName")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Do you have any suggestions for us?
              </span>
            </label>
            <input
              type="text"
              placeholder="Where can we improve?"
              className="input input-bordered"
              {...register("suggestions")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Kindly express your care in a short way.
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              type="text"
              placeholder="Express your feelings"
              {...register("details")}
            />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <button type="submit">
              <Button>Submit review</Button>
            </button>
            {errors.rating && (
              <p className="text-red-500">Rating is required.</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddReview;
