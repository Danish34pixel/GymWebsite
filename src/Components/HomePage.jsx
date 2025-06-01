import React, { useState, useEffect } from "react";
import ThreeScene from "./ThreeScene";
import LoadingScreen from "./LoadingScreen"; // 👈 Import the loading screen

const HomePage = ({ setCurrentPage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />; // 👈 Show loader while loading

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="bg-black/50 backdrop-blur-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-500">
            Iconic Fitness Center
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentPage("login")}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-all"
            >
              Login
            </button>
            <button
              onClick={() => setCurrentPage("signup")}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-6xl font-bold mb-6">
          Transform Your <span className="text-red-500">Body</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join the ultimate fitness experience with state-of-the-art equipment
        </p>
        <ThreeScene />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {["Modern Equipment", "Expert Trainers", "24/7 Access"].map(
            (title, i) => (
              <div
                key={i}
                className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-4 text-red-400">
                  {title}
                </h3>
                <p className="text-gray-300">
                  Some awesome feature about {title.toLowerCase()}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
