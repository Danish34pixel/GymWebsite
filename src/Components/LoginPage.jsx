import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./FirebaseInit";

const LoginPage = ({ loginData, setLoginData, handleLogin, goHome }) => {
  const [firebaseError, setFirebaseError] = useState("");

  const handleFirebaseLogin = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      handleLogin(e); // Call your local handler for any extra logic
    } catch (error) {
      // Show more user-friendly error messages
      let msg = error.message;
      if (error.code === "auth/user-not-found") {
        msg = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        msg = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        msg = "Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later.";
      }
      setFirebaseError(msg);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 text-center">Login</h2>
      <form onSubmit={handleFirebaseLogin} className="space-y-4">
        {firebaseError && (
          <div className="text-red-400 text-sm mb-2 text-center">
            {firebaseError}
          </div>
        )}
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
