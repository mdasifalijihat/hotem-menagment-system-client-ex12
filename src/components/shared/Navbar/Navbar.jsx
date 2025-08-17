import { Link, NavLink, useNavigate } from "react-router";
import { FaBell, FaBars, FaInfoCircle, FaHome, FaUtensils, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";

const Navbar = () => {
  const { user, logout } = useAuth() || {};
  const [notifications, setNotifications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/notifications?email=${user.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
        }
      })
      .catch((err) => {
        console.error("Notification fetch error:", err);
      });
  }, [user?.email, axiosSecure]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: err.message,
            });
          });
      }
    });
  };

  // ✅ Navbar links
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary flex items-center gap-1">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/meals"
          className="hover:text-primary flex items-center gap-1"
        >
          <FaUtensils /> Meals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcoming-meals"
          className="hover:text-primary flex items-center gap-1"
        >
          <FaCalendarAlt /> Upcoming Meals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/membershipSection"
          className="hover:text-primary flex items-center gap-1"
        >
          <FaCreditCard /> Membership
        </NavLink>
      </li>
      <li className="dropdown dropdown-hover">
        <label
          tabIndex={0}
          className="flex items-center gap-1 cursor-pointer hover:text-primary"
        >
          <FaInfoCircle /> Info
        </label>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link to="/about">About Hostel</Link>
          </li>
          <li>
            <Link to="/help">Help & Support</Link>
          </li>
          <li>
            <Link to="/announcements">Announcements</Link>
          </li>
        </ul>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow sticky top-0 z-50 ">
      <div className="navbar container mx-auto  px-4 ">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-xl">
              <FaBars />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-primary ml-2">
            HostelMate
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-base font-medium text-gray-700">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3">
          {/* ✅ Notification Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle relative">
                <FaBell className="text-xl text-gray-700 hover:text-primary" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="badge badge-sm bg-red-500 text-white absolute -top-1 -right-1">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72 max-h-80 overflow-y-auto z-50"
              >
                {notifications?.length > 0 ? (
                  notifications.map(
                    (noti) => (
                      console.log(noti),
                      (
                        <li key={noti._id}>
                          <Link
                            to={noti.link}
                            className="hover:bg-gray-100 py-2 px-3 rounded-md block"
                          >
                            {noti.message}
                          </Link>
                        </li>
                      )
                    )
                  )
                ) : (
                  <li className="text-gray-500 text-center py-2">
                    No notifications
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* ✅ User Avatar / Join Us */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/VcPYRmNd/avatar.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              >
                <li className="text-center font-semibold text-gray-700">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/join-us" className="btn btn-primary btn-sm">
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
