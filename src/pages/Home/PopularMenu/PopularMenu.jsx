import { useEffect } from "react";
import SectionTitile from "../../shared/SectionTitle/SectionTitile";
import { useState } from "react";
import MenuItem from "../../shared/MenuItem/MenuItem";


const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular')
                setMenu(popularItems)
            })
    }, [])
    return (
        <div>
            <SectionTitile
                heading={"From Our Menu"}
                subHeading={"Popular Items"}
            />
            <div className="grid md:grid-cols-2 gap-10">
                {
                    menu.map((item, index) => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>

        </div>
    );
};

export default PopularMenu;