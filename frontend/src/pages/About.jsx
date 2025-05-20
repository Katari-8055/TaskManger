import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/10 backdrop-blur-md shadow-sm">
        <div className="text-white font-bold text-2xl tracking-wide">
          TaskMaster
        </div>
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li
            className="hover:text-blue-200 transition cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="hover:text-blue-200 transition cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="hover:text-blue-200 transition cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </li>
        </ul>
        <button
          className="hidden md:block bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>

      {/* About Section */}
      <section className="px-6 py-12 md:py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          About <span className="text-yellow-300">TaskMaster</span>
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10">
          TaskMaster is a powerful, user-friendly task management application designed to help
          individuals and teams plan, organize, and track their work efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">
              🔥 Simple & Intuitive
            </h3>
            <p className="text-white/80">
              Our clean interface helps you manage tasks without distractions. Just create, pin,
              edit, delete, and search notes effortlessly.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">
              🚀 Boost Productivity
            </h3>
            <p className="text-white/80">
              Plan your day, set priorities, and keep track of important notes and todos. Stay
              organized and get more done.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">
              💻 Built for Developers
            </h3>
            <p className="text-white/80">
              Designed using React, TailwindCSS, and Node.js with authentication, routing, and REST
              APIs. Fast, scalable, and reliable.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <button
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl text-lg transition"
            onClick={() => navigate("/login")}
          >
            Start Using TaskMaster
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
