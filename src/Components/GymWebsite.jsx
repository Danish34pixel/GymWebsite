import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AdminPanel from "./AdminPanel";
import HomePage from "./HomePage";

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
    const storedMembers = JSON.parse(localStorage.getItem("gymMembers")) || [];
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
        // Only store minimal user info to avoid quota issues
        const minimalUser = { email: user.email, role: user.role, name: user.name };
        localStorage.setItem("loggedInUser", JSON.stringify(minimalUser));
      } catch (e) {
        // Fallback: remove if quota exceeded
        localStorage.removeItem("loggedInUser");
        // Optionally, show a warning or log
        console.warn("Could not save user to localStorage:", e);
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
      alert("Signup successful! Your cash payment is pending admin confirmation.");
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
      loginData.email === "admin@gym.com" &&
      loginData.password === "admin123"
    ) {
      setUser({ role: "admin", email: "admin@gym.com" });
      setCurrentPage("admin");
      return;
    }

    const foundUser = members.find(
      (m) => m.email === loginData.email && m.password === loginData.password
    );

    if (foundUser) {
      if (foundUser.status === "pending") {
        alert("Your cash payment is pending admin confirmation.");
        return;
      }
      setUser(foundUser);
      alert(`Welcome ${foundUser.name}`);
      setCurrentPage("home");
    } else {
      alert("Invalid credentials. Please sign up first.");
    }
  };

  const deleteMember = (index) => {
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
          goHome={setCurrentPage} // ← FIXED HERE
        />
      ) : (
        <LoginPage
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
          goHome={setCurrentPage} // ← FIXED HERE
        />
      );
    }

    if (user.role === "admin") {
      return (
        <AdminPanel
          members={members}
          deleteMember={deleteMember}
          logout={logout}
        />
      );
    }

    return <HomePage setCurrentPage={setCurrentPage} logout={logout} />;
  };

  return <div className="font-sans">{renderPage()}</div>;
};

export default GymWebsite;
