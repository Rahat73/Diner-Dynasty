import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHeader from "../../../Components/SectionHeader";
import { motion } from "framer-motion";
import { dashboardVariants } from "../DashboardVariants/DashboardVariants";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const result = await axiosSecure.get("/users");
    return result.data;
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`https://diner-dynasty-server.vercel.app/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(
            <p>
              <span className="font-semibold">{user.userName}</span>, is now an
              admin
            </p>
          );
        }
      });
  };

  const handleRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`https://diner-dynasty-server.vercel.app/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Removed!", "User has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Diner Dynasty | All Users</title>
      </Helmet>
      <motion.div
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <SectionHeader
          heading={"All Users"}
          subHeading={"Manage"}
        ></SectionHeader>
        <div className="bg-base-200 p-10 w-11/12 lg:max-h-[32rem] overflow-auto mx-auto border border-current">
          <div className="flex justify-evenly items-center">
            <h1 className="text-2xl font-semibold">
              Total Users: {users?.length}
            </h1>
          </div>
          <div className="overflow-x-auto my-10">
            {users.length > 0 ? (
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.userName}</td>
                      <td>{user.userEmail}</td>
                      <td>
                        {user.role === "admin" ? (
                          "Admin"
                        ) : (
                          <div
                            className="tooltip tooltip-left"
                            data-tip="make admin"
                          >
                            <button
                              onClick={() => handleMakeAdmin(user)}
                              className="btn btn-ghost btn-xs"
                            >
                              <FaUserShield className="text-2xl text-green-600" />
                            </button>
                          </div>
                        )}
                      </td>
                      <th>
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="btn btn-ghost btn-xs"
                        >
                          <FaTrash className="text-xl text-red-700" />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-4xl text-center my-20">No users found</div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AllUsers;
