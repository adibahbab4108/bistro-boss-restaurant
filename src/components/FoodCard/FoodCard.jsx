
const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure><img src={image} alt={name} /></figure>
            <p className="absolute right-5 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="">{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4 border-orange-400 bg-slate-100 ">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;