import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import { FaCalendarCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { parseISO, format } from "date-fns";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [selectedDate, setSelcetedDate] = useState(""); //used to detect if date selected
  const [selectedGuests, setSelectedGuests] = useState(""); //used to detect if guest selected

  const { data: availableSlots = [], isLoading } = useQuery({
    queryKey: ["selected-date", selectedDate, selectedGuests],
    enabled: selectedDate !== "" && selectedGuests !== "",
    queryFn: async () => {
      const res = await axios(
        `http://localhost:5000/booking-options?date=${selectedDate}&guests=${selectedGuests}`
      );
      return res.data;
    },
  });

  // console.log(selectedDate, selectedGuests);
  console.log(availableSlots);

  const handleDateChange = (event) => {
    //date selected, so make guest selectable and make the query as selectedDate changes values
    setSelcetedDate(format(parseISO(event.target.value), "PP"));
    console.log(format(parseISO(event.target.value), "PP"));
  };

  const handleGuestChange = (event) => {
    //guest selected, so make timeSlot selectable and make the query as selectedGuest changes values
    setSelectedGuests(event.target.value);
    console.log(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const today = new Date();
  const futureDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);

  const onSubmit = (data) => {
    const { date, guests, timeSlot, phone } = data;

    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      phone,
      date: format(parseISO(date), "PP"),
      guests,
      timeSlot,
    };
    axiosSecure.post("/bookings", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success(
          <p>
            Your table has been reserved. <br /> Please check{" "}
            <span className="font-semibold">My Booking</span>
          </p>
        );
        reset();
        setSelcetedDate("");
        setSelectedGuests("");
      } else if (res.data.overBooking) {
        toast.error("Can't book more than 2 times a day");
      } else {
        toast.error(<p>Somthing went wrong</p>);
      }
    });
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
              {errors.date?.type === "min" && (
                <p className="text-red-600 text-sm">
                  {"Can only select future dates"}
                </p>
              )}
              {errors.date?.type === "max" && (
                <p className="text-red-600 text-sm">
                  {"Can only select 5 days in advance"}
                </p>
              )}
            </label>
            <input
              type="date"
              placeholder="dd/mm/yy"
              className="input input-bordered w-full"
              required
              {...register("date", {
                min: new Date().toISOString(),
                max: futureDate.toISOString(),
                onBlur: handleDateChange,
              })}
            />
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Guest*</span>
            </label>
            <select
              className="select select-bordered w-full"
              required
              defaultValue={""}
              {...register("guests", {
                onChange: handleGuestChange,
              })}
            >
              <option disabled value={""}>
                Select an option
              </option>
              <option>1</option>
              <option>2</option>
              <option>3-4</option>
              <option>5-6</option>
              <option>7-8</option>
            </select>
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Time Slot*</span>
            </label>
            <select
              className="select select-bordered w-full"
              required
              defaultValue=""
              {...register("timeSlot")}
            >
              <option disabled value={""}>
                Select an option
              </option>
              {!isLoading &&
                availableSlots.map((timeSlot) => (
                  <option key={timeSlot.slot} value={timeSlot.slot}>
                    {timeSlot.slot}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {timeSlot.left} of {timeSlot.capacity} left
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control w-full md:col-span-6 lg:col-span-4">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Some One"
              className="input input-bordered w-full cursor-not-allowed"
              required
              readOnly
              defaultValue={user?.displayName}
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
              className="input input-bordered w-full cursor-not-allowed"
              required
              readOnly
              defaultValue={user?.email}
            />
          </div>
          <div className="col-span-12 flex flex-col justify-center items-center pt-5 space-y-5">
            <p className=" text-red-600">
              You can make reservations only twice a day
            </p>
            <button>
              <Button>
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
