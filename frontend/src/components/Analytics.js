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

      const placed = studentsData.filter(
        s => s.placementStatus === 'Placed'
      ).length;

      const pending = studentsData.filter(
        s => s.placementStatus === 'Pending'
      ).length;

      const notPlaced = studentsData.filter(
        s => s.placementStatus === 'Not Placed'
      ).length;

      const placedStudents = studentsData.filter(
        s => s.placementStatus === 'Placed' && s.package
      );

      const packages = placedStudents.map(
        s => parseFloat(s.package) || 0
      );

      const avgPkg = packages.length > 0
        ? (
            packages.reduce((a, b) => a + b, 0) /
            packages.length
          ).toFixed(2)
        : 0;

      const highestPkg = packages.length > 0
        ? Math.max(...packages)
        : 0;

      const lowestPkg = packages.length > 0
        ? Math.min(...packages)
        : 0;

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

  // Keep the rest of your existing Analytics.js code from
  // getTopCompanies() onward.
