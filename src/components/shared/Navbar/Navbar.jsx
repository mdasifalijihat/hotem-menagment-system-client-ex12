// import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';


const Navbar = () => {
//   const { user, logout } = useContext() || {}; 

//   const handleLogout = () => {
//     logout()
//       .then(() => {
//         // toast success if needed
//       })
//       .catch(err => console.error(err));
//   };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      <li><NavLink to="/upcoming-meals">Upcoming Meals</NavLink></li>
      <Link to="/join-us" className="btn btn-primary btn-sm">Join Us</Link>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">HostelMate</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base">{navLinks}</ul>
      </div>

      {/* <div className="navbar-end">
        <FaBell className="text-xl mx-3" />
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <img src={user.photoURL || 'https://i.ibb.co/0Jmshvb/avatar.png'} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              <li><span className="font-semibold text-center">{user.displayName}</span></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/join-us" className="btn btn-primary btn-sm">Join Us</Link>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
