import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../api/useAxiosSecure";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password",
      });
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post("/admin-login", {
        email,
        password,
      });

      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("admin-token", res.data.token);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to dashboard...",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/adminDashboard"); // better than window.location.href
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials",
        });
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default AdminLogin;
