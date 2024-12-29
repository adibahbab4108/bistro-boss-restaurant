import featureImg from '../../../assets/home/featured.jpg'
import SectionTitile from '../../shared/SectionTitle/SectionTitile';
import './Featured.css'
const Featured = () => {
    let today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitile
                heading={"Featured Item"}
                subHeading={"Check it out"}

            />
            <div className='flex items-center justify-center py-8 px-36 bg-slate-500/60'>
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>{formattedDate}</p>
                    <p className='uppercase'>Where can i get some ?</p>
                    <p>Discover an exceptional culinary journey at "Where Can I Get Some?". Our cozy ambiance, delectable dishes, and attentive service create the perfect setting for any occasion. Enjoy signature dishes like Grilled Salmon with Lemon Butter Sauce and Mushroom Risotto, paired with an extensive selection of wines and handcrafted cocktails.

                        Conveniently located in the city center, visit us today for a memorable dining experience. 🍽️✨</p>
                    <button className='btn btn-outline border-0 border-b-4'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;