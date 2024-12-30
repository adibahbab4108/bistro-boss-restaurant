import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import useMenu from "../../../hooks/useMenu";
import SectionTitile from "../../shared/SectionTitle/SectionTitile";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* Main Cover */}
            <Cover img={menuImg} title="Our Menu" />
            <SectionTitile heading="Today's Offer" subHeading="Don't Miss" />
            {/* Offered menu items */}
            <MenuCategory items={offered} />
            {/* Dessert menu items */}
            <MenuCategory items={dessert} title="Dessert" img={dessertImg} />
            {/* Pizza menu items */}
            <MenuCategory items={pizza} title="Pizza" img={pizzaImg} />
            {/* Salad menu items */}
            <MenuCategory items={salad} title="Salad" img={saladImg} />
            {/* Soup menu items */}
            <MenuCategory items={soup} title="Soup" img={soupImg} />
        </div>
    );
};

export default Menu;