import React, { useEffect, useState } from "react";

const ConfirmUser = () => {
  const [status, setStatus] = useState("pending");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    setUserEmail(email);
    if (email) {
      const members = JSON.parse(localStorage.getItem("gymMembers")) || [];
      let found = false;
      const updated = members.map((m) => {
        if (m.email === email && m.status === "pending") {
          found = true;
          return { ...m, status: "active" };
        }
        return m;
      });
      if (found) {
        localStorage.setItem("gymMembers", JSON.stringify(updated));
        setStatus("confirmed");
      } else {
        setStatus("notfound");
      }
    } else {
      setStatus("invalid");
    }
  }, []);

  if (status === "pending") return <div>Confirming user...</div>;
  if (status === "confirmed")
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "green" }}>User confirmed!</h2>
        <p>{userEmail} can now log in.</p>
      </div>
    );
  if (status === "notfound")
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "red" }}>User not found or already confirmed.</h2>
        <p>{userEmail}</p>
      </div>
    );
  return <div>Invalid confirmation link.</div>;
};

export default ConfirmUser;
