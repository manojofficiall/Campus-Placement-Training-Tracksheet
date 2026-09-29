
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Overview.css';
// Use public URL for image instead of import

const API_URL = 'https://campus-placement-training-tracksheet.onrender.com/api';

const Overview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    pendingStudents: 0,
    notPlacedStudents: 0,
    totalCompanies: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const [studentsRes, companiesRes] = await Promise.all([
        axios.get(`${API_URL}/students`),
        axios.get(`${API_URL}/companies`)
      ]);

      const students = studentsRes.data;
      const companies = companiesRes.data;

      const placedCount = students.filter(s => s.placementStatus === 'Placed').length;
      const pendingCount = students.filter(s => s.placementStatus === 'Pending').length;
      const notPlacedCount = students.filter(s => s.placementStatus === 'Not Placed').length;

      setStats({
        totalStudents: students.length,
        placedStudents: placedCount,
        pendingStudents: pendingCount,
        notPlacedStudents: notPlacedCount,
        totalCompanies: companies.length
      });
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const placementRate = stats.totalStudents > 0 
    ? ((stats.placedStudents / stats.totalStudents) * 100).toFixed(1) 
    : 0;

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading overview...</p>
      </div>
    );
  }

  return (
    <div className="overview-card-container">
      <div className="overview-card-header">
        <h1>📊 Overview</h1>
        <p>Here is a summary of placement status:</p>
      </div>
      <div className="overview-card-content">
        <ul className="overview-card-list">
          <li><strong>Total Students:</strong> {stats.totalStudents}</li>
          <li><strong>Placed Students:</strong> {stats.placedStudents}</li>
          <li><strong>Pending Students:</strong> {stats.pendingStudents}</li>
          <li><strong>Not Placed Students:</strong> {stats.notPlacedStudents}</li>
          <li><strong>Total Companies:</strong> {stats.totalCompanies}</li>
          <li><strong>Placement Rate:</strong> {placementRate}%</li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;





