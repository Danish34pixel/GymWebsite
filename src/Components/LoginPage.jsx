import React from "react";

const LoginPage = ({ loginData, setLoginData, handleLogin, goHome }) => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-bold transition"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={() => goHome("signup")}
          className="text-red-500 underline hover:text-red-400"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
