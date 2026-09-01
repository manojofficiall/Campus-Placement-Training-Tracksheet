import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

const API_URL = 'http://localhost:5000/api';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    placed: 0,
    pending: 0,
    notPlaced: 0,
    totalCompanies: 0,
    avgPackage: 0,
    highestPackage: 0,
    lowestPackage: 0
  });

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [studentsRes, companiesRes] = await Promise.all([
        axios.get(`${API_URL}/students`),
        axios.get(`${API_URL}/companies`)
      ]);

      const studentsData = Array.isArray(studentsRes.data)
        ? studentsRes.data
        : [];

      const companiesData = Array.isArray(companiesRes.data)
        ? companiesRes.data
        : [];

      setStudents(studentsData);

      const placed = studentsData.filter(
        student => student.placementStatus === 'Placed'
      ).length;

      const pending = studentsData.filter(
        student => student.placementStatus === 'Pending'
      ).length;

      const notPlaced = studentsData.filter(
        student => student.placementStatus === 'Not Placed'
      ).length;

      const placedStudents = studentsData.filter(
        student =>
          student.placementStatus === 'Placed' &&
          student.package !== undefined &&
          student.package !== null &&
          student.package !== ''
      );

      const packages = placedStudents
        .map(student => parseFloat(student.package))
        .filter(packageValue => !Number.isNaN(packageValue));

      const avgPackage =
        packages.length > 0
          ? (
              packages.reduce(
                (total, value) => total + value,
                0
              ) / packages.length
            ).toFixed(2)
          : 0;

      const highestPackage =
        packages.length > 0
          ? Math.max(...packages)
          : 0;

      const lowestPackage =
        packages.length > 0
          ? Math.min(...packages)
          : 0;

      setStats({
        totalStudents: studentsData.length,
        placed,
        pending,
        notPlaced,
        totalCompanies: companiesData.length,
        avgPackage,
        highestPackage,
        lowestPackage
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopCompanies = () => {
    const companyCount = {};

    students
      .filter(
        student =>
          student.placementStatus === 'Placed' &&
          student.company
      )
      .forEach(student => {
        const companyName = student.company.trim();

        companyCount[companyName] =
          (companyCount[companyName] || 0) + 1;
      });

    return Object.entries(companyCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getPlacementPercentage = () => {
    if (stats.totalStudents === 0) {
      return 0;
    }

    return (
      (stats.placed / stats.totalStudents) *
      100
    ).toFixed(1);
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="analytics-loading">
          <h2>Loading Analytics...</h2>
          <p>Please wait while we load placement data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">

      <div className="analytics-header">
        <h1>📊 Placement Analytics</h1>
        <p>
          Overview of student placement performance
        </p>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>👨‍🎓 Total Students</h3>
          <div className="analytics-value">
            {stats.totalStudents}
          </div>
        </div>

        <div className="analytics-card">
          <h3>✅ Placed Students</h3>
          <div className="analytics-value">
            {stats.placed}
          </div>
        </div>

        <div className="analytics-card">
          <h3>⏳ Pending</h3>
          <div className="analytics-value">
            {stats.pending}
          </div>
        </div>

        <div className="analytics-card">
          <h3>❌ Not Placed</h3>
          <div className="analytics-value">
            {stats.notPlaced}
          </div>
        </div>

        <div className="analytics-card">
          <h3>🏢 Total Companies</h3>
          <div className="analytics-value">
            {stats.totalCompanies}
          </div>
        </div>

        <div className="analytics-card">
          <h3>📈 Placement Rate</h3>
          <div className="analytics-value">
            {getPlacementPercentage()}%
          </div>
        </div>

        <div className="analytics-card">
          <h3>💰 Average Package</h3>
          <div className="analytics-value">
            {stats.avgPackage}
          </div>
        </div>

        <div className="analytics-card">
          <h3>🏆 Highest Package</h3>
          <div className="analytics-value">
            {stats.highestPackage}
          </div>
        </div>

        <div className="analytics-card">
          <h3>📉 Lowest Package</h3>
          <div className="analytics-value">
            {stats.lowestPackage}
          </div>
        </div>

      </div>

      <div className="analytics-section">

        <h2>🏢 Top Recruiting Companies</h2>

        <div className="top-companies">

          {getTopCompanies().length > 0 ? (

            getTopCompanies().map(
              ([company, count]) => (
                <div
                  className="company-stat"
                  key={company}
                >
                  <span className="company-name">
                    {company}
                  </span>

                  <span className="company-count">
                    {count}{' '}
                    {count === 1
                      ? 'student'
                      : 'students'}
                  </span>
                </div>
              )
            )

          ) : (

            <p>
              No placement company data available.
            </p>

          )}

        </div>

      </div>

      <div className="analytics-section">

        <h2>📋 Placement Summary</h2>

        <div className="placement-summary">

          <div className="summary-item">
            <span>Total Students</span>
            <strong>
              {stats.totalStudents}
            </strong>
          </div>

          <div className="summary-item">
            <span>Placed</span>
            <strong>
              {stats.placed}
            </strong>
          </div>

          <div className="summary-item">
            <span>Pending</span>
            <strong>
              {stats.pending}
            </strong>
          </div>

          <div className="summary-item">
            <span>Not Placed</span>
            <strong>
              {stats.notPlaced}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;
