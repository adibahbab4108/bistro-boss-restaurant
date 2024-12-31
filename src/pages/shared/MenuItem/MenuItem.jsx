
const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item
    
    return (
        <div className="flex gap-2">
            <img style={{borderRadius:' 0 200px 200px 300px'}} className="w-[120px]" src={image} alt="" />
            <div>
                <h3>{name}-----</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">Tk.{price}</p>
        </div>
    );
};

export default MenuItem;