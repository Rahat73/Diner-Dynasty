import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Components/SectionHeader";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleEditItem = (_id) => {}; //TODO
  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menus/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "Item has been removed.", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Can'remove special item!",
              footer: "Try adding an item then remove",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Manage Items</title>
      </Helmet>
      <div className="w-full">
        <SectionHeader
          heading={"Manage Items"}
          subHeading={"Take Action"}
        ></SectionHeader>
      </div>
      <div className="bg-base-200 p-10 w-11/12 max-h-[30rem] overflow-auto mx-auto border border-current">
        <div className="flex justify-evenly items-center">
          <h1 className="text-2xl font-semibold">Total Items: {menu.length}</h1>
        </div>
        <div className="overflow-x-auto my-10">
          {menu.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="Food" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>$ {item.category}</td>
                    <td>$ {item.price}</td>
                    <th>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaEdit className="text-xl text-green-600" />
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
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
            <div className="text-4xl text-center my-20">No items avilable</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageItems;
