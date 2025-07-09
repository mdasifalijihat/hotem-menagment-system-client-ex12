import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const UpdateMeal = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
      reset(res.data);
    });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      const updated = {
        ...data,
        price: parseFloat(data.price),
      };
      const res = await axiosSecure.put(`/meals/${id}`, updated);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Meal updated", "success");
        navigate("/adminDashboard/all-meals");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  if (!meal) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Meal</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="label">Title</label>
          <input
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <label className="label">Category</label>
          <input
            className="input input-bordered w-full"
            {...register("category", { required: true })}
          />
        </div>
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
        </div>
        <div>
          <label className="label">Ingredients</label>
          <input
            className="input input-bordered w-full"
            {...register("ingredients", { required: true })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="label">Image URL</label>
          <input
            className="input input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>
        <div className="md:col-span-2">
          <button className="btn btn-primary w-full">Update Meal</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMeal;
