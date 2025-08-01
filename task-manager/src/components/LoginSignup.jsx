import React, { useState } from 'react';
import './LoginSignup.css'; // optional styling
import { useNavigate } from 'react-router-dom';

function LoginSignup({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user); // set user in App.js
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if(isLogin){
            navigate("/");
        } else{
            setIsLogin(true);
        }
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <p>
        {isLogin ? "New here?" : "Already have an account?"}
        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? " Create an account" : " Login"}
        </span>
      </p>
    </div>
  );
}

export default LoginSignup;
