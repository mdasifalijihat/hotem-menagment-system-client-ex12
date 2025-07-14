import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaUtensils,
  FaStar,
  FaCalendarAlt,
  FaClipboardList,
  FaBars,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { MdDashboard } from "react-icons/md";

const AdminDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState(""); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("admin-email");
    setAdminEmail(storedEmail || "admin@example.com");
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          localStorage.removeItem("admin-token");
          localStorage.removeItem("admin-email");
          Swal.fire("Logged Out", "You have been logged out.", "success");
          navigate("/admin-login");
        }
      }
    });
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const menuItems = (
    <>
      <Link
        to="/adminDashboard"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <MdDashboard className="inline mr-2" /> Admin Dashboard
      </Link>
      <Link
        to="/adminDashboard/manage-users"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaUsers className="inline mr-2" /> Manage Users
      </Link>
      <Link
        to="/adminDashboard/add-meal"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaPlus className="inline mr-2" /> Add New Meal
      </Link>
      <Link
        to="/adminDashboard/all-meals"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaUtensils className="inline mr-2" /> All Meals
      </Link>
      <Link
        to="/adminDashboard/all-reviews"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaStar className="inline mr-2" /> All Reviews
      </Link>
      <Link
        to="/adminDashboard/serve-meals"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaClipboardList className="inline mr-2" /> Serve Meals
      </Link>
      <Link
        to="/adminDashboard/upcoming-meals"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaCalendarAlt className="inline mr-2" /> Upcoming Meals
      </Link>
      <Link
        to="/adminDashboard/add-upcoming-meal"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaPlus className="inline mr-2" /> Add Upcoming Meal
      </Link>
      <Link
        to="/adminDashboard/admin-seting"
        onClick={closeMobileMenu}
        className="block p-2 rounded hover:bg-gray-100"
      >
        <FaCog className="inline mr-2" /> Admin Seting
      </Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 shadow-md bg-white sticky top-0 z-50">
        <button onClick={toggleMobileMenu} className="text-xl">
          <FaBars />
        </button>
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-xl text-gray-700" />
          <button onClick={handleLogout} className="text-red-500 text-xl">
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white p-4 shadow-md">
          {menuItems}
        </div>
      )}

      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white shadow-md p-4 min-h-screen sticky top-0">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={"https://i.ibb.co/1tj5L709/Dr-Ayesha-Siddika.webp"}
            alt="Admin"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <h2 className="text-lg font-bold">Admin</h2>
            <p className="text-sm text-gray-500">{adminEmail} </p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">{menuItems}</nav>
        <div className="mt-auto flex items-center gap-4 pt-6 border-t">
          <FaEnvelope className="text-xl text-gray-700" />
          <button onClick={handleLogout} className="text-red-500 text-xl">
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
