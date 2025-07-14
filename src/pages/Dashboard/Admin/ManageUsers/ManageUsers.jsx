import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // ✅ useQuery to fetch subscribed users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subscribedUsers", query],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscribed-users?search=${query}`);
      return res.data;
    },
  });

  const handleSearch = () => {
    setQuery(search.trim());
  };

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/${email}`, {
        role: "admin",
        status: "active",
      });

      if (res.data.modifiedCount > 0 || res.data.result?.modifiedCount > 0) {
        await Swal.fire({
          title: "Success!",
          text: `${email} has been promoted to admin.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch(); // ✅ refetch users after update
      } else {
        Swal.fire({
          title: "No Changes",
          text: "User is already an admin or update failed.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Failed to update user role", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the user.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const confirmMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${email} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleMakeAdmin(email);
      }
    });
  };

  // ✅ Show loading spinner while fetching users
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Subscribed Users</h2>

      {/* 🔍 Search Box + Button */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          <FaSearch className="mr-1" /> Search
        </button>
      </div>

      {/* 📋 User Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Package</th>
              <th>Subscription</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.package || "—"}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "active" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {u.status || "pending"}
                  </span>
                </td>
                <td>{u.role || "user"}</td>
                <td>
                  {u.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => confirmMakeAdmin(u.email)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
