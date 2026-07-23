import React, { useState } from "react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${credentials.username}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "320px", margin: "40px auto", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label htmlFor="username" style={{ display: "block", marginBottom: "8px" }}>Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
        />
      </div>
      <div>
        <label htmlFor="password" style={{ display: "block", marginBottom: "8px" }}>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
          style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
        />
      </div>
      <button type="submit" style={{ padding: "10px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
        Sign In
      </button>
    </form>
  );
}
