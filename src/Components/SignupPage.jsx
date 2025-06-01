import React from "react";

const SignupPage = ({
  formData,
  setFormData,
  handleSignup,
  handleFileChange,
  goHome,
}) => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-bold transition"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={() => goHome("login")}
          className="text-red-500 underline hover:text-red-400"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
