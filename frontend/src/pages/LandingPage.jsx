import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/10 backdrop-blur-md shadow-sm">
        <div className="text-white font-bold text-2xl tracking-wide">
          TaskMaster
        </div>
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="hover:text-blue-200 transition cursor-pointer">Home</li>
          <li className="hover:text-blue-200 transition cursor-pointer">Features</li>
          <li className="hover:text-blue-200 transition cursor-pointer">Pricing</li>
          <li className="hover:text-blue-200 transition cursor-pointer">Contact</li>
        </ul>
        <button className="hidden md:block bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 max-w-3xl w-full text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Boost Your Productivity
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your daily tasks efficiently with{" "}
            <span className="text-blue-600 font-semibold">TaskMaster</span>. Plan,
            prioritize, and execute—stress free.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl text-lg shadow-md transition"
            onClick={() => navigate("/login")}
            >
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl text-lg transition"
            onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              alt="Task illustration"
              className="w-44 md:w-52"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

