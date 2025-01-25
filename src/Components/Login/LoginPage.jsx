import React, { useState } from "react";
import "./LoginPageStyle.css";

const LoginPage = () => {
  const [role, setRole] = useState("student"); // Default role is student
  const [credentials, setCredentials] = useState({
    username: "",
    dob: "", // Date of Birth
    password: "", // Password for admin
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${role}`, credentials);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>FEE Management Portal</h2>

        <div className="role-buttons">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={credentials.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          {role === "admin" && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
