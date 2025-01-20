import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const handleLogOut = () => {
        logOut().then(() => { }).then(error => alert(error))
    }
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="menu">Our Menu</Link></li>
        <li><Link to="order/salad">Order</Link></li>
        {
            user && isAdmin && <li><Link to="dashboard/admin-home">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="dashboard/user-home">Dashboard</Link></li>
        }
        <li>
            <Link to="dashboard/cart" className="btn">
                <FaShoppingCart className="mr-2" />
                <div className="badge badge-secondary">+{cart.length}</div>
            </Link>
        </li>
        <li>
            {
                user ?
                    <>
                        <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
                    </> :
                    <>
                        <Link to="login">Login</Link>
                    </>
            }
        </li>

    </>
    return (
        <div className="navbar fixed z-10 bg-black/40 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-2xl">
                        <FaBars />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">BistroBoss</Link>
            </div>
            <div className="navbar-center hidden lg:flex items-center justify-center">
                <ul className="menu menu-horizontal px-1 items-center">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get Started</a>
            </div>
        </div>
    );
};

export default Navbar;