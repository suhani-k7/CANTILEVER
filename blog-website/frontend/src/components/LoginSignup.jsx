import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import blogServices from '../services/blogs';

function LoginSignup({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const user = await loginService.login({ username, password });
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
        blogServices.setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
        navigate('/');
      } catch (err) {
        alert("Couldn't login. Please check your credentials.");
      }
    } else {
      try {
        await loginService.signUp({ username, password });
        setUsername('');
        setPassword('');
        setIsLogin(true);
      } catch (err) {
        alert("Sign-up failed. Try a different username.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
