import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./FirebaseInit";

const SignupPage = ({
  formData,
  setFormData,
  handleSignup,
  handleFileChange,
  goHome,
}) => {
  const [firebaseError, setFirebaseError] = useState("");

  const handleFirebaseSignup = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    const auth = getAuth(app);
    try {
      // Validate email and password before sending to Firebase
      if (!formData.email || !formData.password) {
        setFirebaseError("Email and password are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      handleSignup(e); // Call your local handler for any extra logic
    } catch (error) {
      // Show more user-friendly error messages
      let msg = error.message;
      if (error.code === "auth/email-already-in-use") {
        msg = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        msg = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }
      setFirebaseError(msg);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleFirebaseSignup} className="space-y-4">
        {firebaseError && (
          <div className="text-red-400 text-sm mb-2 text-center">
            {firebaseError}
          </div>
        )}
        <input
          type="text"
          placeholder="Address"
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
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

        {/* Payment Method */}
        <div className="w-full p-3 rounded bg-gray-800 border border-gray-700">
          <label className="block mb-2 text-left">Payment Method</label>
          <select
            value={formData.paymentMethod || ""}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="online">Online</option>
            <option value="cash">Cash</option>
          </select>

          {/* Show QR code if Online is selected */}
          {formData.paymentMethod === "online" && (
            <div className="mt-4 flex flex-col items-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@bank&pn=Gym%20Payment&am=500"
                alt="QR Code for Online Payment"
                className="w-40 h-40 border-4 border-white rounded-lg mb-2"
              />
              <span className="text-xs text-gray-300">
                Scan to pay (sample QR)
              </span>
            </div>
          )}
        </div>

        {/* Payment Plan */}
        <div className="w-full p-3 rounded bg-gray-800 border border-gray-700">
          <label className="block mb-2 text-left">Payment Plan</label>
          <select
            value={formData.paymentPlan || ""}
            onChange={(e) =>
              setFormData({ ...formData, paymentPlan: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            // required
          >
            <option value="">Select Plan</option>
            <option value="monthly">₹500 per month</option>
            <option value="quarterly">₹1200 for 3 months</option>
            <option value="yearly">₹6000 per year</option>
          </select>
        </div>
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
