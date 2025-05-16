import React, { useState } from "react";
import "./Login.css"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInput = () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const isValid = onLogin(username, password);
    if (!isValid) {
      setError("Invalid username or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleInput();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-header">Sign in to your account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInput();
          }}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              autoFocus
              placeholder="Enter your username"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              placeholder="Enter your password"
              className="input-field"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
