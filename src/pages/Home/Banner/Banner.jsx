import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../../../assets/home/01.jpg"
import img2 from "../../../assets/home/02.jpg"
import img3 from "../../../assets/home/03.png"
import img4 from "../../../assets/home/04.jpg"
import img5 from "../../../assets/home/05.png"
import img6 from "../../../assets/home/06.png"
const images = [img1, img2, img3, img4, img5, img6];

const Banner = () => {
    var settings = {
        customPaging: function (i) {
            return (
                <a> <img src={images[i]} alt={`Thumbnail ${i + 1}`} className=" h-10 object-cover" /> </a>
            );
        },
        dots: true,
        // dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "linear",

    };
    return (
        <div className="slider-container mb-20">
            <Slider {...settings}>
                <div>
                    <img src={img1} alt="slider1" />
                </div>
                <div>
                    <img src={img2} alt="slider2" />
                </div>
                <div>
                    <img src={img3} alt="slider3" />
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

export default Banner;