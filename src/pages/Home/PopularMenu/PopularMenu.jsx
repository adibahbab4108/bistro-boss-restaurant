import SectionTitile from "../../shared/SectionTitle/SectionTitile";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <div>
            <SectionTitile
                heading={"From Our Menu"}
                subHeading={"Popular Items"}
            />
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map((item, index) => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            <div className="flex justify-center">
                <Link to='/menu' className="btn btn-outline border-0  border-b-4 mt-4 ">View Full Menu</Link>

            </div>

        </div>
    );
};

export default PopularMenu;