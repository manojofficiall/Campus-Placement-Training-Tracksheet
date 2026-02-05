import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <img src="/Manoj.png" alt="Logo" className="about-logo" />
        <h1>Campus Placement Tracksheet</h1>
        <p className="about-tagline">Streamlining Placement Management</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>About</h2>
          <p>
            A comprehensive web application for managing campus placement activities, tracking student placements, 
            and monitoring company recruitment processes.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul className="simple-list">
            <li>👥 Student Management - Track placement status and student information</li>
            <li>🏢 Company Management - Maintain company database and recruitment details</li>
            <li>📊 Analytics Dashboard - View placement statistics and insights</li>
            <li>🔍 Search & Filter - Find students quickly with advanced filters</li>
            <li>🔐 Secure Login - Protected access for authorized users</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Technology</h2>
          <p><strong>MERN Stack:</strong> MongoDB, Express.js, React.js, Node.js</p>
        </section>

        <section className="about-section">
          <h2>Version</h2>
          <p>Version 1.0.0 | Last Updated: January 30, 2026</p>
        </section>
      </div>
    </div>
  );
};

export default About;
