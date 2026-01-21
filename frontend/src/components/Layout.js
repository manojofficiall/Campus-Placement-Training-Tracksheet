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
          <div className="nav-brand" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img src={process.env.PUBLIC_URL + '/Manoj.png'} alt="Logo" style={{width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain'}} />
            <h2 style={{margin: 0}}>Placement Tracksheet</h2>
          </div>
          <ul className="nav-menu">
            <li>
              <Link to="/overview" className={`nav-link ${isActive('/overview')}`}>
                📊 Overview
              </Link>
            </li>
            <li>
              <Link to="/create" className={`nav-link ${isActive('/create')}`}>
                ➕ Create
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





