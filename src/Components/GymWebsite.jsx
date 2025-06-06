import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AdminPanel from "./AdminPanel";
import HomePage from "./HomePage";
import ApproveUser from "./ApproveUser"; // <-- Add this if not already
import emailjs from "emailjs-com";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const GymWebsite = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    image: null,
    role: "member",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    const adminUser = {
      name: "admin",
      email: "Imi.khan1987@gmail.com",
      password: "123456789",
      age: "",
      gender: "",
      image: null,
      role: "admin",
      status: "active",
    };
    let storedMembers = JSON.parse(localStorage.getItem("gymMembers")) || [];
    const hasAdmin = storedMembers.some(
      (m) => m.email === adminUser.email && m.role === "admin"
    );
    if (!hasAdmin) {
      storedMembers = [adminUser, ...storedMembers];
      localStorage.setItem("gymMembers", JSON.stringify(storedMembers));
    }
    setMembers(storedMembers);

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setCurrentPage(storedUser.role === "admin" ? "admin" : "home");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gymMembers", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    if (user) {
      try {
        const minimalUser = {
          email: user.email,
          role: user.role,
          name: user.name,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(minimalUser));
      } catch (e) {
        localStorage.removeItem("loggedInUser");
      }
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const exists = members.some((m) => m.email === formData.email);
    if (exists) {
      alert("Email already registered!");
      return;
    }

    let base64Image = null;
    if (formData.image) {
      base64Image = await fileToBase64(formData.image);
    }

    const newMember = {
      ...formData,
      image: base64Image,
      status: formData.paymentMethod === "cash" ? "pending" : "active",
      approved: formData.paymentMethod === "cash" ? false : true,
    };

    setMembers([...members, newMember]);

    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      image: null,
    });

    if (formData.paymentMethod === "cash") {
      const EMAILJS_SERVICE_ID = "service_e8ui0id";
      const EMAILJS_TEMPLATE_ID = "template_ckmu8z8";
      const EMAILJS_PUBLIC_KEY = "HPatAYbWo_57IPJu6";

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            user_email: formData.email,
            user_name: formData.name,
            confirm_link: `${
              window.location.origin
            }/approve?email=${encodeURIComponent(formData.email)}`,
            admin_email: "Imi.khan1987@gmail.com",
          },
          EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log("Email sent to admin:", result.text);
            alert(
              "Signup successful! Your cash payment is pending admin confirmation."
            );
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            alert(
              "Signup successful, but failed to send confirmation email. Contact admin."
            );
          }
        );
    } else {
      alert("Signup successful! Please log in.");
    }
    setCurrentPage("login");
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.email === "Imi.khan1987@gmail.com" &&
      loginData.password === "123456789"
    ) {
      setUser({
        role: "admin",
        email: "Imi.khan1987@gmail.com",
        name: "admin",
      });
      setCurrentPage("admin");
      return;
    }

    const foundUser = members.find(
      (m) => m.email === loginData.email && m.password === loginData.password
    );

    if (foundUser) {
      if (foundUser.status === "pending" || foundUser.approved === false) {
        // Block login and show message if not approved
        alert(
          "Your account is pending admin approval. Please check your email after admin approval to login."
        );
        setLoginData({ email: "", password: "" });
        return;
      }
      setUser(foundUser);
      alert(`Welcome ${foundUser.name}`);
      setCurrentPage("home");
      setLoginData({ email: "", password: "" });
    } else {
      alert("Invalid credentials. Please sign up first.");
      setLoginData({ email: "", password: "" });
    }
  };

  const deleteMember = (index) => {
    const member = members[index];
    if (
      member &&
      member.role === "admin" &&
      member.email === "Imi.khan1987@gmail.com"
    ) {
      alert("Admin user cannot be deleted.");
      return;
    }
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  const logout = () => {
    setUser(null);
    setLoginData({ email: "", password: "" });
    setCurrentPage("login");
  };

  const renderPage = () => {
    if (!user) {
      return currentPage === "signup" ? (
        <SignupPage
          formData={formData}
          setFormData={setFormData}
          handleSignup={handleSignup}
          handleFileChange={handleFileChange}
          goHome={setCurrentPage}
        />
      ) : (
        <LoginPage
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
          goHome={setCurrentPage}
        />
      );
    }

    if (user.role === "admin") {
      return (
        <AdminPanel
          members={members}
          deleteMember={deleteMember}
          logout={logout}
          setMembers={setMembers}
        />
      );
    }

    return (
      <HomePage setCurrentPage={setCurrentPage} logout={logout} user={user} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="font-sans">{renderPage()}</div>}
        />
        <Route path="/approve" element={<ApproveUser />} />
      </Routes>
    </Router>
  );
};

export default GymWebsite;
