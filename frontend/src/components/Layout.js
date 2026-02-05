import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="layout-container">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <img src="/Manoj.png" alt="Logo" className="nav-logo" />
            <h2>Placement Tracksheet</h2>
          </div>
          <ul className="nav-menu">
            <li>
              <Link to="/overview" className={`nav-link ${isActive('/overview')}`}>
                📊 Overview
              </Link>
            </li>
            <li>
              <Link to="/students" className={`nav-link ${isActive('/students')}`}>
                👥 Students
              </Link>
            </li>
            <li>
              <Link to="/companies" className={`nav-link ${isActive('/companies')}`}>
                🏢 Companies
              </Link>
            </li>
            <li>
              <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>
                📈 Analytics
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                ℹ️ About
              </Link>
            </li>
            <li>
              <Link to="/create" className={`nav-link ${isActive('/create')}`}>
                ➕ Create
              </Link>
            </li>
          </ul>
          <button className="btn-logout-nav" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;





