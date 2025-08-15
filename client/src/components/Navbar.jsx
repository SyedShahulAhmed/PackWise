import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSuitcaseRolling, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-purple-900 px-6 py-3 shadow-lg flex items-center justify-between">
      {/* Left Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center text-gray-200 hover:text-purple-400 font-medium transition-colors gap-2"
        >
          <FaHome />
          Home
        </Link>
        {token && (
          <Link
            to="/trips"
            className="flex items-center text-gray-200 hover:text-purple-400 font-medium transition-colors gap-2"
          >
            <FaSuitcaseRolling />
            My Trips
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {user && (
          <span className="flex items-center text-gray-300 gap-2">
            <FaUser className="text-purple-400" />
            Hi, <span className="text-purple-400 font-semibold">{user.name}</span>
          </span>
        )}
        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-md shadow transition-colors duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow transition-colors duration-300"
          >
            <FaSignInAlt />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
