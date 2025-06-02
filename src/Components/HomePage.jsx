import React, { useState, useEffect } from "react";
import ThreeScene from "./ThreeScene";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";

const HomePage = ({ setCurrentPage, logout }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <nav className="bg-black/50 backdrop-blur-sm p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500">
            Iconic Fitness Center
          </h1>
          <div className="space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row w-full sm:w-auto">
            <button
              onClick={() => setCurrentPage("login")}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-all w-full sm:w-auto"
            >
              Login
            </button>
            <button
              onClick={() => setCurrentPage("signup")}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-all w-full sm:w-auto"
            >
              Sign Up
            </button>
            {/* Logout Button */}
            <button
              onClick={logout}
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg transition-all w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6">
          Transform Your <span className="text-red-500">Body</span>
        </h2>
        <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
          Join the ultimate fitness experience with state-of-the-art equipment
        </p>

        {/* 3D Scene */}
        <div className="w-full h-[300px] sm:h-[500px] mb-12">
          <ThreeScene />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-16">
          {["Modern Equipment", "Expert Trainers", "24/7 Access"].map(
            (title, i) => {
              if (i === 0) {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      window.location.href =
                        "https://machine-gallery-88bv.vercel.app/";
                    }}
                    className="bg-gray-800/50 p-6 sm:p-8 rounded-lg backdrop-blur-sm text-center cursor-pointer hover:bg-gray-700 transition"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-red-400">
                      {title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Some awesome feature about {title.toLowerCase()}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className="bg-gray-800/50 p-6 sm:p-8 rounded-lg backdrop-blur-sm text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-red-400">
                    {title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Some awesome feature about {title.toLowerCase()}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
