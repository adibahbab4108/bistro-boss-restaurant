import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';

const Main = () => {
    return (
        <div >
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;