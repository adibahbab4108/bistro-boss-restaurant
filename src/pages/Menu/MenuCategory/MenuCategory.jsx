import { Link } from "react-router-dom";
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    console.log(items[0]?.category)
    return (
        <div className="pt-10">
            {
                title && <Cover img={img} title={title} />
            }
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {items.map((item) => (
                    <MenuItem key={item._id} item={item} />
                ))}
            </div>
            <Link to={`/order/${title ? title: 'offer'}`}>
                <div className="flex justify-center">
                    <button className='btn btn-outline border-0 border-b-4'>Order your favourite food</button>
                </div>
            </Link>
        </div>
    );
};

export default MenuCategory;