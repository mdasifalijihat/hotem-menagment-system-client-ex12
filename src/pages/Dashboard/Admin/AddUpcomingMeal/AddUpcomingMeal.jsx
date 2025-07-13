import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../api/useAxiosSecure";
import Swal from "sweetalert2";

const AddUpcomingMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    try {
      const imgRes = await axiosSecure.post(image_upload_url, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgRes.data.success) {
        const meal = {
          title: data.title,
          category: data.category,
          price: parseFloat(data.price),
          description: data.description,
          ingredients: data.ingredients,
          postTime: data.postTime,
          distributor: data.distributor,
          email: data.email,
          image: imgRes.data.data.display_url,
        };

        const res = await axiosSecure.post("/upcoming-meals", meal);
        if (res.data.success) {
          Swal.fire("Success", "Upcoming meal added!", "success");
          reset();
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Upcoming Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Meal Title" className="input input-bordered w-full" required />
        <select {...register("category")} className="select select-bordered w-full" required>
          <option value="">Select Category</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <input {...register("price")} type="number" placeholder="Price" className="input input-bordered w-full" required />
        <input {...register("ingredients")} placeholder="Ingredients" className="input input-bordered w-full" required />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" required />
        <input {...register("postTime")} type="datetime-local" className="input input-bordered w-full" required />
        <input {...register("distributor")} className="input input-bordered w-full" defaultValue="Admin Name" readOnly />
        <input {...register("email")} className="input input-bordered w-full" defaultValue="admin@email.com" readOnly />
        <input {...register("image")} type="file" className="file-input w-full" accept="image/*" required />
        <button type="submit" className="btn btn-primary w-full">Add Meal</button>
      </form>
    </div>
  );
};

export default AddUpcomingMeal;
