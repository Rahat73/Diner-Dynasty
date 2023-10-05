import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const result = await fetch("http://localhost:5000/users");
    return result.json();
  });

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
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
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
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
      <div className="bg-base-200 p-10 w-11/12 mx-auto my-10">
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
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-ghost btn-xs"
                        >
                          <FaUserShield className="text-lg text-green-500" />
                        </button>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrash className="text-lg text-red-700" />
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
    </>
  );
};

export default AllUsers;
