import React, { useState } from 'react';
import { saveUsername } from '../utils/localStorage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      saveUsername(username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
