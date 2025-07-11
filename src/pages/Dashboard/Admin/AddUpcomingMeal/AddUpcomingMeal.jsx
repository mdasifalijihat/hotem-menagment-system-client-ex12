import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddUpcomingMeal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    try {
      const res = await axios.post(image_upload_url, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.url;

        const upcomingMeal = {
          title: data.title,
          category: data.category,
          price: parseFloat(data.price),
          ingredients: data.ingredients,
          description: data.description,
          image: imageUrl,
          distributor: data.distributor,
          email: data.email,
          postTime: data.postTime,
          likes: 0,
          status: "upcoming",
        };

        await axios.post(
          `${import.meta.env.VITE_API_URL}/upcoming-meals`,
          upcomingMeal
        );

        reset();
        setIsModalOpen(false);

        Swal.fire("Success", "Upcoming Meal Added", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add upcoming meal", "error");
    }
  };

  return (
    <div className="text-center">
      <button
        className="btn btn-secondary"
        onClick={() => setIsModalOpen(true)}
      >
        Add Upcoming Meal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog id="upcomingModal" className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-4">Add Upcoming Meal</h3>
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
                {errors.title && <p className="text-red-500">Title required</p>}
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
              </div>

              {/* Price */}
              <div>
                <label className="label">Price</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="label">Ingredients</label>
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
                ></textarea>
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
                  defaultValue="Admin"
                  readOnly
                />
              </div>

              {/* Distributor Email */}
              <div className="md:col-span-2">
                <label className="label">Distributor Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input input-bordered w-full"
                  defaultValue="admin@example.com"
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

              <div className="md:col-span-2 flex justify-between mt-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddUpcomingMeal;
