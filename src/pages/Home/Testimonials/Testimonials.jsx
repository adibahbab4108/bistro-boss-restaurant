import SectionTitile from "../../shared/SectionTitle/SectionTitile";
// import required modules

//import swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    })
    return (
        <div>
            <SectionTitile
                heading={'Testimonials'}
                subHeading={'What our client say'}
            />

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center my-16 mx-24">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>
                    )
                }
            </Swiper>

        </div>
    );
};

export default Testimonials;