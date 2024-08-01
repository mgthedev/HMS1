import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

// Utility function for error handling
const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || "An error occurred";
  } else if (error.request) {
    return "No response received from the server";
  } else {
    return "Error in setting up the request";
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  // Handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hmsback.vercel.app/api/v1/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle successful login
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/dashboard"); // Redirect to the dashboard
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle errors
      toast.error(handleError(error));
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO ZEECARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
