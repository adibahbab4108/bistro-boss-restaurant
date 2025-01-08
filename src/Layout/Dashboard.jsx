import React from 'react';
import { FaAd, FaBars, FaChair, FaEnvelope, FaHome, FaList, FaShoppingCart, FaStar, FaUsers, FaUtensils } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { MdAssignment } from 'react-icons/md';

const Dashboard = () => {
    const [cart] = useCart()

    const isAdmin = true;

    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className=" w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4'>
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/admin-home">
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-items">
                                        <FaUtensils/>
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-items">
                                        <FaList />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-bookings">
                                        <MdAssignment />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers />
                                     All Users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/user-home">
                                        <FaHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalculator />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-review">
                                        <FaStar />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <FaStar />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-booking">
                                        <FaChair />
                                        My Booking
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart />
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaBars />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </li>


                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 bg-blue-300 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;