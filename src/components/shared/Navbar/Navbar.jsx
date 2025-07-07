import { Link, NavLink } from 'react-router';
import { FaBell, FaBars } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth() || {};

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged out successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed',
              text: err.message,
            });
          });
      }
    });
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      <li><NavLink to="/upcoming-meals">Upcoming Meals</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Navbar Start (Left) */}
      <div className="navbar-start">
        {/* Mobile Menu Toggle */}
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

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary ml-2">
          HostelMate
        </Link>
      </div>

      {/* Navbar Center (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End (Right) */}
      <div className="navbar-end">
        <FaBell className="text-xl mx-3 block" />

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <img
                  src={user.photoURL || 'https://i.ibb.co/0Jmshvb/avatar.png'}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li className="text-center font-semibold text-gray-700">
                {user.displayName || 'User'}
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
  );
};

export default Navbar;
