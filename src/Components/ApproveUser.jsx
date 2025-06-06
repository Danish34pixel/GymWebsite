import React, { useEffect, useState } from "react";

const ApproveUser = () => {
  const [status, setStatus] = useState("Approving...");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("❌ Invalid or missing email.");
      return;
    }

    setUserEmail(email);

    const members = JSON.parse(localStorage.getItem("gymMembers")) || [];
    let found = false;

    const updatedMembers = members.map((member) => {
      if (member.email === email && member.status === "pending") {
        found = true;
        return { ...member, status: "active", approved: true };
      }
      return member;
    });

    if (found) {
      localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));
      setStatus("✅ User has been approved successfully.");
    } else {
      setStatus("❌ User not found or already approved.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Approval Status</h2>
        <p className="mb-2">{status}</p>
        {userEmail && <p className="text-sm text-gray-400">{userEmail}</p>}

        {status === "✅ User has been approved successfully." && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Proceed to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ApproveUser;
