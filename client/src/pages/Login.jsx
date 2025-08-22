import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://pack-wise-coral.vercel.app/login",
        formData
      );

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        style: { background: "#1F2937", color: "#E5E7EB" }, // Tailwind gray-800 bg, gray-200 text
      });

      setTimeout(() => navigate("/trips"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        style: { background: "#1F2937", color: "#FCA5A5" }, // Tailwind red-300 text
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Toast Container */}
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
