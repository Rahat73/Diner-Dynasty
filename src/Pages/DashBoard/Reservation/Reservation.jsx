import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import { FaCalendarCheck } from "react-icons/fa";

const Reservation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
    console.log(data);
  };
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Reservation</title>
      </Helmet>
      <div className="w-full">
        <SectionHeader
          heading={"Reservation"}
          subHeading={"Book a table"}
        ></SectionHeader>
      </div>
      <div className="bg-base-200 p-10 w-11/12 mx-auto border border-current">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 md:space-y-0 md:grid grid-cols-12 gap-3"
        >
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Date*</span>
            </label>
            <input
              type="date"
              placeholder="dd/mm/yy"
              className="input input-bordered w-full"
              required
              {...register("date")}
            />
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Guest*</span>
            </label>
            <select
              className="select select-bordered w-full"
              required
              {...register("guest")}
            >
              <option>1</option>
              <option>2</option>
              <option>3 or 4</option>
              <option>5 or 6</option>
              <option>7 ot 8</option>
            </select>
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Time Slot*</span>
            </label>
            <select
              className="select select-bordered w-full"
              required
              {...register("timeSlot")}
            >
              <option>10:00</option>
              <option>12:30</option>
              <option>14:00</option>
              <option>19:00</option>
              <option>20:30</option>
            </select>
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Some One"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Phone*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 01XXXXXXXXX"
              className="input input-bordered w-full"
              pattern="^01[35789]\d{8}$"
              required
              {...register("phone")}
            />
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Email*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. someone@mail.com"
              className="input input-bordered w-full"
              required
              {...register("email")}
            />
          </div>
          <div className="col-span-12 flex justify-center">
            <button>
              <Button className="my-5">
                <p className="flex">
                  {"Book Table"} <FaCalendarCheck className="ml-2" />
                </p>
              </Button>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reservation;
