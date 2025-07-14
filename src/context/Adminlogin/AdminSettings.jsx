import { useState } from "react";
import useAxiosSecure from "../../api/useAxiosSecure";
import Swal from "sweetalert2";

const AdminSettings = () => {
  const [emailToAdd, setEmailToAdd] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const axiosSecure = useAxiosSecure();

  const makeAdmin = async () => {
    if (!emailToAdd.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email is required",
      });
      return;
    }
    if (!newPassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password is required",
      });
      return;
    }
    try {
      const res = await axiosSecure.patch("/make-admin", { email: emailToAdd });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Admin added successfully",
      });
      console.log(res.data)

      const passRes = await axiosSecure.patch("/change-password", {
        email: emailToAdd,
        newPassword,
      });

      if (passRes.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin password changed successfully",
        });
      }
    } catch (err) {
      console.error("Make admin error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to add admin",
      });
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🔐 Admin Settings</h2>

      <div className="mb-4">
        <input
          className="input input-bordered w-full mb-2"
          placeholder="Admin Email"
          value={emailToAdd}
          onChange={(e) => setEmailToAdd(e.target.value)}
        />
        <input
          className="input input-bordered w-full mb-2"
          type="password"
          placeholder="Set Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="btn btn-secondary w-full" onClick={makeAdmin}>
          Add New Admin
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
