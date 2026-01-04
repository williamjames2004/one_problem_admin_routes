import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    admin_code: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://one-problem-per-day.onrender.com/admin/login",
        form
      );

      if (res.data.success) {
        onLoginSuccess(res.data.admin_code);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="background w-100">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Administrator Login</h1>

        <div className="input-group">
          <input
            type="text"
            name="admin_code"
            placeholder="Admin Code"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-group">
          <button type="submit">Login</button>
        </div>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};


export default Login;
