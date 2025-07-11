import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { updateProfile } from "firebase/auth"; // ✅ ADD THIS
import useAuth from "../../../hooks/useAuth";
import SocailLogin from "./SocailLogin";
import useAxiosSecure from "../../../api/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    try {
      // 1. Upload Image to imgbb
      let photoURL = "";
      if (photo && photo[0]) {
        const formData = new FormData();
        formData.append("image", photo[0]);

        const res = await fetch(image_upload_url, {
          method: "POST",
          body: formData,
        });
        const imgData = await res.json();
        if (imgData.success) {
          photoURL = imgData.data.display_url;
        }
      }

      // 2. Create user with Firebase
      const userCredential = await createUser(email, password);
      
      // 3. Update Firebase user profile
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // 4. Save user info to MongoDB
      const userInfo = {
        name,
        email,
        photoURL,
        status: "pending",
      };

      await axiosSecure.post("/users", userInfo);

      reset();

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join us by filling the form below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Asif Ali"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              placeholder="example@mail.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full mt-1 pr-10"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="absolute right-3 top-[38px] text-xl cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mt-1"
              {...register("photo")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {/* 🔗 Link to Login */}
        <div className="text-center text-sm mt-4">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="divider">OR</div>
        <SocailLogin />
      </div>
    </div>
  );
};

export default Register;
