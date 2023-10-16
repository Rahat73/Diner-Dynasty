import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure("/bookings");
      return res.data;
    },
  });

  const handleConfirmBooking = (id) => {
    axiosSecure.patch(`/bookings/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Booking confirmed!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Manage Bookings</title>
      </Helmet>
      <div className="w-full">
        <SectionHeader
          heading={"Manage Bookings"}
          subHeading={"Take Action"}
        ></SectionHeader>
      </div>
      <div className="bg-base-200 p-10 w-11/12 lg:max-h-[30rem] overflow-auto mx-auto border border-current">
        <h1 className="text-2xl font-semibold text-center">
          Total Bookings: {allBookings.length}
        </h1>
        <div className="overflow-x-auto my-10">
          {allBookings.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Info</th>
                  <th>Guests</th>
                  <th>Time Slot</th>
                  <th>Date</th>
                  <th>Booked On</th>
                  <th>Status</th>
                  <th>Confirm</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <ul>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                        <li>{item.phone}</li>
                      </ul>
                    </td>
                    <td>{item.guests}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.date}</td>
                    <td>{item.bookedOn}</td>
                    <td>
                      {item.status === "confirmed" ? "Confirmed" : "Pending"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleConfirmBooking(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaCheckCircle className="text-2xl text-amber-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-4xl text-center my-20">
              No bookings to show
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBookings;
