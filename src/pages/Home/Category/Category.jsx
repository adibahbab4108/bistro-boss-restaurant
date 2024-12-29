import Slider from "react-slick";

import img1 from "../../../assets/menu/salad-bg.jpg"
import img2 from "../../../assets/menu/soup-bg.jpg"
import img3 from "../../../assets/menu/pizza-bg.jpg"
import img4 from "../../../assets/menu/dessert-bg.jpeg"
import img5 from "../../../assets/home/05.png"
import img6 from "../../../assets/home/06.png"
import SectionTitile from "../../shared/SectionTitle/SectionTitile";
const images = [img1, img2, img3, img4, img5, img6];

const Category = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
        ]
    };
    return (
        <div className="slider-container ">
            <SectionTitile
            subHeading={"From 11:00am to 10:00pm"}
            heading ={"Order Online"}
            />
            <Slider {...settings}>
                <div>
                    <img src={img1} alt="slider1" />
                    <h3 className="text-4xl uppercase text-center -mt-12 ">Salad</h3>
                </div>
                <div>
                    <img src={img2} alt="slider2" />
                    <h3 className="text-4xl uppercase text-center -mt-12">Soup</h3>
                </div>
                <div>
                    <img src={img3} alt="slider3" />
                    <h3 className="text-4xl uppercase text-center -mt-12">Pizza</h3>
                </div>
                <div>
                    <img src={img4} alt="slider4" />
                </div>
                <div>
                    <img src={img5} alt="slider5" />
                </div>
                <div>
                    <img src={img6} alt="slider6" />
                </div>
            </Slider>
        </div>
    );
};

export default Category;