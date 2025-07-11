import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../api/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...userData } = userInfo;
      const res = await axiosSecure.patch(`/users/${user.email}`, userData);
      console.log("✅ Axios PATCH response:", res.data);

      if (res?.data?.result?.modifiedCount > 0) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setEditable(false);
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (err) {
      console.error("❌ Patch error:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>
      <div className="flex justify-center mb-4">
        <img
          src={userInfo.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={userInfo.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={userInfo.photoURL || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-between pt-4">
          {editable ? (
            <>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setEditable(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditable(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
