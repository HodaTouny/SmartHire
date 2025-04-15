import React, { useState } from "react";
import "./EmailConfigForm.css";
import { useNavigate } from "react-router-dom";
import { showToast } from "../CustomAlerts/CustomeAlert";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function EmailConfigForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [type, setType] = useState("IMAP");
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !host || !username || !password) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const configData = {
      email,
      type,
      host,
      username,
      password,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        `${apiUrl}/email/save-config`,
        configData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        showToast("Email configuration saved successfully!", "success");

        // Clear the form before navigating
        setEmail("");
        setType("IMAP");
        setHost("");
        setUsername("");
        setPassword("");

        setTimeout(() => {
          navigate("/recruiter/filter-form");
        }, 3000);
      } else {
        showToast("Failed to save email configuration.", "error");
      }
    } catch (error) {
      console.error("Error saving config:", error);

      if (
        error.response?.status === 400) {
        showToast("Email already exists.", "error");
        setTimeout(() => {
          navigate("/recruiter/filter-form");
        }, 3000);
      } else {
        showToast(error.response?.data?.message || "Something went wrong.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container config-form">
      <h2 className="title">Add Email Configuration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="IMAP">IMAP</option>
        </select>

        <input
          type="text"
          placeholder="Host (Gmail: imap.gmail.com)"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username (Your Gmail)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (App Password from Gmail)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="btn-container">
          <button
            className="btn email-config-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailConfigForm;
