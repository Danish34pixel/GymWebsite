import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = ({ members, deleteMember, logout }) => {
  // Toast for delete action
  const handleDelete = (index) => {
    deleteMember(index);
    toast.success("Member deleted successfully!", { position: "top-right" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Panel</h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Show total members and capacity info */}
      <div className="mb-6 text-lg font-semibold text-yellow-400">
        Total Members: {members.length} / 50000
        {members.length >= 50000 && (
          <span className="ml-4 text-red-500">(Capacity Full)</span>
        )}
      </div>

      {members.length === 0 ? (
        <p className="text-gray-400">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800/70 p-4 rounded-lg backdrop-blur-sm shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-300">Email: {member.email}</p>
              <p className="text-sm text-gray-300">Age: {member.age}</p>
              <p className="text-sm text-gray-300">Gender: {member.gender}</p>
              <p className="text-sm text-gray-300 mb-4">
                Subscription: {member.paymentPlan ? member.paymentPlan : "N/A"}
              </p>
              {/* Hide delete button for admin */}
              {!(
                member.role === "admin" &&
                member.email === "Imi.khan1987@gmail.com"
              ) && (
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg text-white"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
