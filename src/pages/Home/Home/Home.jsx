import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';

const Home = () => {
    return (
        <>
            <Banner />
            <div className='max-w-screen-xl mx-auto'>
                <Category />
                <PopularMenu/>
            </div>
        </>
    );
};

export default Home;