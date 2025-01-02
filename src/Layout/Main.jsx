import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    console.log(location.pathname)
    const noHeaderFooter = location.pathname.includes('login')
    console.log(noHeaderFooter)
    return (
        <div >
           {noHeaderFooter ||  <Navbar />}
            <div className=''>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;