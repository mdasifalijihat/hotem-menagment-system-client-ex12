import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaTachometerAlt,
  FaUsersCog,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaHome,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth() || {};

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden lg:flex flex-col items-center py-6 px-4">
        {/* Admin Avatar */}

        <div className="flex flex-col items-center mb-6">
          <img
            className="rounded-full w-12 h-12"
            src={user?.photoURL || "https://i.ibb.co/fY34pzmL/download-13.jpg"}
            alt="User"
          />
          <h2 className="mt-3 text-lg font-semibold text-gray-700">
            {user?.displayName || "Admin Name"}
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 w-full">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
          >
            <FaTachometerAlt /> My Profile
          </Link>
          <Link
            to="/dashboard/requestedMeals"
            className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
          >
            <FaUsersCog /> Requested Meals
          </Link>
          <Link
            to="/dashboard/myReviews"
            className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
          >
            <FaCog /> My Reviews
          </Link>
          <Link
            to="/dashboard/paymentHistory"
            className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
          >
            <FaCog /> Payment History
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
          >
            <FaSignOutAlt className="text-red-500" /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="btn btn-circle btn-outline text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md p-4 z-40 overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <img
              className="rounded-full w-12 h-12"
              src={
                user?.photoURL || "https://i.ibb.co/fY34pzmL/download-13.jpg"
              }
              alt="User"
            />
            <h2 className="mt-3 text-lg font-semibold text-gray-700">
              {user?.displayName || "Admin Name"}
            </h2>
          </div>
          <nav className="flex flex-col gap-3">
            <Link
              to="/dashboard/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <FaUserCircle /> My Profile
            </Link>
            <Link
              to="/dashboard/requestedMeals"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <FaQuestionCircle /> Requested Meals
            </Link>
            <Link
              to="/dashboard/myReviews"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <FaQuestionCircle /> My Reviews
            </Link>
            <Link
              to="/dashboard/paymentHistory"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <FaQuestionCircle /> Payment History
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-md flex items-center justify-between px-4 py-3">
          <div className="ml-12 items-center pt-3">
            <NavLink
              to="/"
              className="flex items-center gap-2 mb-4 text-blue-600 font-semibold"
            >
              <FaHome /> Back to Home
            </NavLink>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <FaBell className="text-xl cursor-pointer" />
            <FaEnvelope className="text-xl cursor-pointer" />

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    className="rounded-full w-12 h-12"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/fY34pzmL/download-13.jpg"
                    }
                    alt="User"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              >
                <li>
                  <Link to="/dashboard/profile">
                    <FaUserCircle /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/requestedMeals">
                    <FaQuestionCircle /> Requested Meals
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/myReviews">
                    <FaQuestionCircle /> My Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/paymentHistory">
                    <FaQuestionCircle /> Payment History
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
