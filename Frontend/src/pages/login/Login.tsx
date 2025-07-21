import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: username,
        password: password,
      });
      localStorage.setItem("token", response.data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:5173`;
  };

  const handleGithubLogin = () => {
    console.log("Login with GitHub");
  };

  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="zmdi zmdi-account zmdi-hc-lg"></i>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Log In</button>
      </form>

      <div className="social-buttons">
        <button className="social-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <button className="social-button" onClick={handleGithubLogin}>
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
