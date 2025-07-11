import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";

const SocailLogin = () => {
  const { socialLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    try {
      const result = await socialLogin();
      const user = result.user;
      await socialLogin();
      // Step 1: Prepare user info
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        status: "pending",
      };
      // Step 2: Save to DB (optional: check if user already exists)
      await axiosSecure.post("/users", userInfo);
      // Step 3: Success message
      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center gap-2"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocailLogin;
