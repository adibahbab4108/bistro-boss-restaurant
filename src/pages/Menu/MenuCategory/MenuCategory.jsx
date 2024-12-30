import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-10">
            {
                title && <Cover img={img} title={title} />
            }
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {items.map((item, index) => (
                    <MenuItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MenuCategory;