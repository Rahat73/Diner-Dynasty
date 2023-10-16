import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import useBookings from "../../../hooks/useBookings";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const MyBookings = () => {
  const [bookings, refetch] = useBookings();
  const handleRemoveBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "Reservation has been removed", "success");
          } else {
            Swal.fire("Oops!", "Something went wrong", "error");
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | My Bookings</title>
      </Helmet>
      <SectionHeader
        heading={"My Bookings"}
        subHeading={"Manage"}
      ></SectionHeader>
      <div className="bg-base-200 p-10 w-11/12 lg:max-h-[30rem] overflow-auto mx-auto border border-current">
        <h1 className="text-2xl font-semibold text-center">
          Total Bookings: {bookings.length}
        </h1>
        <div className="overflow-x-auto my-10">
          {bookings.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Booked On</th>
                  <th>Guests</th>
                  <th>Time Slot</th>
                  <th>Date</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.bookedOn}</td>
                    <td>{item.guests}</td>
                    <td>{item.timeSlot}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveBooking(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrash className="text-lg text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-4xl text-center my-20">
              No reservations to show
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
