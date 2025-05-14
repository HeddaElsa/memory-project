import React from 'react';
import { useState } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';

import MemoryGame from './components/MemoryGame';

function App() {
  const [currentScreen, setCurrentScreen] = useState("Registration");
  const [error, setError] = useState("");

  const handleRegistration = () => {
    setCurrentScreen("Login");
  };

  const handleLogin = (username, password) => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      setCurrentScreen("Memory");
    } else {
      setError("Invalid username or password");
    }
  };
  
  return (
    <div>
    {currentScreen === "Registration" && <Registration onRegistration={handleRegistration} />}
    {currentScreen === "Login" && <Login onLogin={handleLogin} />}
    {currentScreen === "Memory" && <MemoryGame />}
  </div>
  )
}

export default App
