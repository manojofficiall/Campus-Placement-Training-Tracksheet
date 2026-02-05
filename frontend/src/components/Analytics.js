import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

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
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [studentsRes, companiesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/students'),
        axios.get('http://localhost:5000/api/companies')
      ]);

      const studentsData = studentsRes.data;
      const companiesData = companiesRes.data;

      setStudents(studentsData);
      setCompanies(companiesData);

      const placed = studentsData.filter(s => s.placementStatus === 'Placed').length;
      const pending = studentsData.filter(s => s.placementStatus === 'Pending').length;
      const notPlaced = studentsData.filter(s => s.placementStatus === 'Not Placed').length;

      const placedStudents = studentsData.filter(s => s.placementStatus === 'Placed' && s.package);
      const packages = placedStudents.map(s => parseFloat(s.package) || 0);
      
      const avgPkg = packages.length > 0 
        ? (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2)
        : 0;
      
      const highestPkg = packages.length > 0 ? Math.max(...packages) : 0;
      const lowestPkg = packages.length > 0 ? Math.min(...packages) : 0;

      setStats({
        totalStudents: studentsData.length,
        placed,
        pending,
        notPlaced,
        totalCompanies: companiesData.length,
        avgPackage: avgPkg,
        highestPackage: highestPkg,
        lowestPackage: lowestPkg
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const getTopCompanies = () => {
    const companyCount = {};
    students.forEach(student => {
      if (student.placementStatus === 'Placed' && student.company) {
        companyCount[student.company] = (companyCount[student.company] || 0) + 1;
      }
    });

    return Object.entries(companyCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([company, count]) => ({ company, count }));
  };

  const getPackageDistribution = () => {
    const ranges = {
      '0-5 LPA': 0,
      '5-10 LPA': 0,
      '10-15 LPA': 0,
      '15+ LPA': 0
    };

    students.forEach(student => {
      if (student.placementStatus === 'Placed' && student.package) {
        const pkg = parseFloat(student.package);
        if (pkg < 5) ranges['0-5 LPA']++;
        else if (pkg < 10) ranges['5-10 LPA']++;
        else if (pkg < 15) ranges['10-15 LPA']++;
        else ranges['15+ LPA']++;
      }
    });

    return ranges;
  };

  const placementRate = stats.totalStudents > 0 
    ? ((stats.placed / stats.totalStudents) * 100).toFixed(1)
    : 0;

  const topCompanies = getTopCompanies();
  const packageDistribution = getPackageDistribution();

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>📊 Analytics Dashboard</h1>
        <p>Comprehensive placement insights and statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>{stats.placed}</h3>
            <p>Students Placed</p>
            <span className="metric-badge">{placementRate}%</span>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">⏳</div>
          <div className="metric-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="metric-card danger">
          <div className="metric-icon">❌</div>
          <div className="metric-content">
            <h3>{stats.notPlaced}</h3>
            <p>Not Placed</p>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">🏢</div>
          <div className="metric-content">
            <h3>{stats.totalCompanies}</h3>
            <p>Total Companies</p>
          </div>
        </div>

        <div className="metric-card package">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>₹{stats.avgPackage}</h3>
            <p>Average Package (LPA)</p>
          </div>
        </div>

        <div className="metric-card highest">
          <div className="metric-icon">🏆</div>
          <div className="metric-content">
            <h3>₹{stats.highestPackage}</h3>
            <p>Highest Package (LPA)</p>
          </div>
        </div>

        <div className="metric-card lowest">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>₹{stats.lowestPackage}</h3>
            <p>Lowest Package (LPA)</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Status Distribution */}
        <div className="chart-card">
          <h3>📈 Placement Status Distribution</h3>
          <div className="visual-chart">
            <div className="bar-chart">
              <div className="bar-group">
                <div 
                  className="bar placed" 
                  style={{height: `${(stats.placed / stats.totalStudents * 100)}%`}}
                >
                  <span className="bar-value">{stats.placed}</span>
                </div>
                <label>Placed</label>
              </div>
              <div className="bar-group">
                <div 
                  className="bar pending" 
                  style={{height: `${(stats.pending / stats.totalStudents * 100)}%`}}
                >
                  <span className="bar-value">{stats.pending}</span>
                </div>
                <label>Pending</label>
              </div>
              <div className="bar-group">
                <div 
                  className="bar not-placed" 
                  style={{height: `${(stats.notPlaced / stats.totalStudents * 100)}%`}}
                >
                  <span className="bar-value">{stats.notPlaced}</span>
                </div>
                <label>Not Placed</label>
              </div>
            </div>
          </div>
        </div>

        {/* Package Distribution */}
        <div className="chart-card">
          <h3>💵 Package Distribution</h3>
          <div className="package-bars">
            {Object.entries(packageDistribution).map(([range, count]) => (
              <div key={range} className="package-bar-row">
                <span className="package-label">{range}</span>
                <div className="package-bar-container">
                  <div 
                    className="package-bar-fill" 
                    style={{width: `${(count / stats.placed * 100) || 0}%`}}
                  >
                    <span className="package-count">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="chart-card">
          <h3>🏆 Top Recruiting Companies</h3>
          <div className="top-companies-list">
            {topCompanies.length > 0 ? (
              topCompanies.map((item, index) => (
                <div key={index} className="company-item">
                  <span className="company-rank">#{index + 1}</span>
                  <span className="company-name">{item.company}</span>
                  <span className="company-count">{item.count} students</span>
                </div>
              ))
            ) : (
              <p className="no-data">No placement data available</p>
            )}
          </div>
        </div>

        {/* Placement Rate Gauge */}
        <div className="chart-card">
          <h3>🎯 Overall Placement Rate</h3>
          <div className="gauge-container">
            <div className="gauge">
              <div className="gauge-fill" style={{transform: `rotate(${placementRate * 1.8}deg)`}}></div>
              <div className="gauge-center">
                <span className="gauge-value">{placementRate}%</span>
              </div>
            </div>
            <div className="gauge-labels">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h3>💡 Key Insights</h3>
        <div className="insights-grid">
          {stats.placed > stats.pending && (
            <div className="insight-card positive">
              <span className="insight-icon">🎉</span>
              <p>Great progress! More students are placed than pending.</p>
            </div>
          )}
          {stats.avgPackage > 8 && (
            <div className="insight-card positive">
              <span className="insight-icon">💰</span>
              <p>Excellent! Average package is above ₹8 LPA.</p>
            </div>
          )}
          {placementRate >= 70 && (
            <div className="insight-card positive">
              <span className="insight-icon">🏆</span>
              <p>Outstanding! Placement rate is {placementRate}%.</p>
            </div>
          )}
          {stats.pending > stats.placed && (
            <div className="insight-card warning">
              <span className="insight-icon">⚠️</span>
              <p>Focus needed: {stats.pending} students still pending placement.</p>
            </div>
          )}
          {topCompanies.length > 0 && (
            <div className="insight-card info">
              <span className="insight-icon">📊</span>
              <p>{topCompanies[0].company} is the top recruiter with {topCompanies[0].count} placements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
