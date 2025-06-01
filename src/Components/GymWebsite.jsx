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

  // Helper to convert image file to base64 string
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Load members and logged-in user from localStorage on mount
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("gymMembers")) || [];
    setMembers(storedMembers);

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setCurrentPage(storedUser.role === "admin" ? "admin" : "home");
    }
  }, []);

  // Save members to localStorage when members state changes
  useEffect(() => {
    localStorage.setItem("gymMembers", JSON.stringify(members));
  }, [members]);

  // Save logged-in user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if email already exists
    const exists = members.some((m) => m.email === formData.email);
    if (exists) {
      alert("Email already registered!");
      return;
    }

    // Convert image file to base64 if exists
    let base64Image = null;
    if (formData.image) {
      base64Image = await fileToBase64(formData.image);
    }

    const newMember = {
      ...formData,
      image: base64Image,
    };

    setMembers([...members, newMember]);

    // Clear form
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      image: null,
    });

    alert("Signup successful! Please log in.");
    setCurrentPage("login");
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin login check
    if (
      loginData.email === "admin@gym.com" &&
      loginData.password === "admin123"
    ) {
      setUser({ role: "admin", email: "admin@gym.com" });
      setCurrentPage("admin");
      return;
    }

    // Member login check
    const foundUser = members.find(
      (m) => m.email === loginData.email && m.password === loginData.password
    );

    if (foundUser) {
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
    setCurrentPage("login");
  };

  const renderPage = () => {
    if (!user) {
      if (currentPage === "signup") {
        return (
          <SignupPage
            formData={formData}
            setFormData={setFormData}
            handleSignup={handleSignup}
            handleFileChange={handleFileChange}
            goHome={() => setCurrentPage("login")}
          />
        );
      }
      return (
        <LoginPage
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
          goHome={() => setCurrentPage("signup")}
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
