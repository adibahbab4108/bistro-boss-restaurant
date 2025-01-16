import { useLoaderData } from "react-router-dom";
import SectionTitile from "../shared/SectionTitle/SectionTitile";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_apiKey
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const { _id, name, category, image, recipe, price } = useLoaderData()
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {
            image: data.image[0],
        }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(res.data)
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: data.price,

            }
            const { data: newMenuRes } = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(newMenuRes)
            if (newMenuRes.modifiedCount>0) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: `${data.name} updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div>
            <SectionTitile heading="Update an Item" subHeading="update info" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text" placeholder="recipe name"
                            defaultValue={name}
                            className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-4">
                        {/* Category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select defaultValue={category} {...register("category")} className="select select-bordered w-full ">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                defaultValue={price}
                                {...register("price", { required: true })}
                                type="number" placeholder="price"
                                className="input input-bordered w-full " />

                        </label>
                    </div>
                    {/* Recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            defaultValue={recipe}
                            {...register('recipe')}
                            className="textarea textarea-bordered h-24"
                            placeholder="recipe details"></textarea>
                    </label>

                    {/* File input */}
                    <div className="form-control w-full my-6">
                        <input type="file" {...register('image', { required: true })}
                            className="file-input w-full max-w-xs" />

                    </div>
                    <button className="btn">
                        Update Item <FaUtensils className="ml-4" />
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UpdateItem;