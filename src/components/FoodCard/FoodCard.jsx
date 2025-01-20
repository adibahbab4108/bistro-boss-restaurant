import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const axiosSecure =useAxiosSecure()
    const [, refetch] =useCart()
    const { name, image, price, recipe } = item;
    const navigate = useNavigate();
    const location = useLocation()

    const handleAddToCart = (food) => {
        const { _id, category, image, name, price, recipe } = food
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, image, price, recipe
            }

            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: `${name} added to cart successfully`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        //refetch and update cartitem count 
                        refetch()
                    }
                })
        } else {
            Swal.fire({
                title: "You need to Login before proceed",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { pathname: location.pathname } })
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    // });
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure><img src={image} alt={name} /></figure>
            <p className="absolute right-5 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="">{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-outline border-0 border-b-4 border-orange-400 bg-slate-100 ">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;