import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMeal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    try {
      // Upload image to imgbb
      const res = await axios.post(image_upload_url, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.url;

        const mealData = {
          title: data.title,
          category: data.category,
          price: parseFloat(data.price),
          ingredients: data.ingredients,
          description: data.description,
          image: imageUrl,
          distributor: data.distributor,
          email: data.email,
          postTime: data.postTime,
          rating: 0,
          likes: 0,
          reviews: 0,
        };

        // Send meal data to your server
        await axios.post(`${import.meta.env.VITE_API_URL}/meals`, mealData);

        reset();

        Swal.fire({
          title: "Success!",
          text: "Meal added successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Meal</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <div>
          <label className="label">Meal Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {errors.category && (
            <p className="text-red-500">Category is required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="label">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="label">Ingredients (comma separated)</label>
          <input
            type="text"
            {...register("ingredients", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Post Time */}
        <div>
          <label className="label">Post Time</label>
          <input
            type="datetime-local"
            {...register("postTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Distributor Name */}
        <div>
          <label className="label">Distributor Name</label>
          <input
            type="text"
            {...register("distributor")}
            className="input input-bordered w-full"
            defaultValue="Admin" // set dynamically from logged-in user
            readOnly
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="label">Distributor Email</label>
          <input
            type="email"
            {...register("email")}
            className="input input-bordered w-full"
            defaultValue="admin@example.com" // set dynamically
            readOnly
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="label">Meal Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button className="btn btn-primary w-full">Add Meal</button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
