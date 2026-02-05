import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Try to get from localStorage or default to false
    return localStorage.getItem('loginDarkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('loginDarkMode', darkMode);
  }, [darkMode]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple validation
      if (!formData.username || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }


      // For now, we'll use a simple hardcoded check
      // In production, this would call your backend API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple authentication (replace with actual API call)
      if (formData.username && formData.email && formData.password) {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'dummy-token');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('username', formData.username);
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="login-container">
        {/* Animated background shapes */}
        <div className="login-bg-shape shape1"></div>
        <div className="login-bg-shape shape2"></div>
        <div className="login-bg-shape shape3"></div>

        <div className="login-card">
          {/* Dark/Light mode toggle button */}
          <button
            className="toggle-mode-btn"
            type="button"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          <div className="login-header">
            <div className="login-logo">
              <img src="/Manoj.png" alt="Placement Tracksheet Logo" />
            </div>
            <h1>Placement Tracksheet</h1>
            <p>Campus Placement Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>



            <button 
              type="submit" 
              className="btn btn-primary btn-login"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>



        </div>
      </div>
    );
};

export default Login;

