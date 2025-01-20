import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/menu/${item._id}`)
               
                if (data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                    refetch();
                } else {
                    Swal.fire({
                        title: "Ops!",
                        text: "Something went wrong!",
                        icon: "warning"
                    });
                }

            }
        });
    }
    const handleUpdateItem = (item) => {
        Swal.fire({
            title: "This feature will be availabe soon!",
            text: "Something went wrong!",
            icon: "warning"
        });
    }
    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th className=" pl-14">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, i) => <tr key={item._id}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name} />
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{item.name}</div>
                                    </td>
                                    <td>${item.price}</td>
                                    <td className="">
                                        <Link to={`/dashboard/update-item/${item._id}`} className="btn btn-ghost">
                                            <FaEdit className="text-orange-600 text-xl" />
                                        </Link>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost ">
                                            <FaTrash className="text-red-700 text-xl" />
                                        </button>
                                    </td>
                                </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;