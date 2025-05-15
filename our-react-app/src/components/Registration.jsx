import React, { useState } from "react";
import './Registration.css';

const Registration = ({ onRegistration }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    onRegistration();
  };

  return (
    <>
      <div className="registration-container">
        <div className="registration-header">
          <h2>Create account</h2>
        </div>
        <div className="registration-form-wrapper">
          <form onSubmit={handleRegistration} className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
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
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn-submit">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
