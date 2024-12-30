import { useState } from "react";
import orderCover from "../../assets/shop/banner2.jpg"
import Cover from "../shared/Cover/Cover";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/FoodCard/FoodCard";
const Order = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Cover img={orderCover} title="Order food" />
            <div role="tablist" className="tabs tabs-lifted">
                <a role="tab" className={`tab ${activeTab === 1 ? 'tab-active' : ''}`} onClick={() => setActiveTab(1)} > Salad</a>
                <a role="tab" className={`tab ${activeTab === 2 ? 'tab-active' : ''}`} onClick={() => setActiveTab(2)} > Pizza </a>
                <a role="tab" className={`tab ${activeTab === 3 ? 'tab-active' : ''}`} onClick={() => setActiveTab(3)} > Soup</a>
                <a role="tab" className={`tab ${activeTab === 4 ? 'tab-active' : ''}`} onClick={() => setActiveTab(4)} > Dessert</a>
                <a role="tab" className={`tab ${activeTab === 5 ? 'tab-active' : ''}`} onClick={() => setActiveTab(5)} > Drinks</a>
            </div>
            <div className="grid md: grid-cols-3 gap-10">
                {activeTab === 1 && salad.map(item => <FoodCard item={item} />)}
                {activeTab === 2 && pizza.map(item => <FoodCard item={item} />)}
                {activeTab === 3 && soup.map(item => <FoodCard item={item} />)}
                {activeTab === 4 && dessert.map(item => <FoodCard item={item} />)}
                {activeTab === 5 && drinks.map(item => <FoodCard item={item} />)}
            </div>
        </div>
    );
};

export default Order;