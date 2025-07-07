import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const SocailLogin = () => {
  const { socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    try {
      await socialLogin();
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
