import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/api";
import { AuthContext } from "../App"; // Import AuthContext
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext); // Use AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      console.log("Login response:", data); // Debugging

      if (!data.access_token) {
        throw new Error("No token received");
      }

      authLogin(data.access_token); // Use authLogin from AuthContext
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}

export default Login;