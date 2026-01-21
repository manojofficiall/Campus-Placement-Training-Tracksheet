import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentForm from './StudentForm';
import CompanyForm from './CompanyForm';
import './CreatePage.css';

const STUDENTS_API = 'http://localhost:5000/api/students';

const CreatePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student');
  const [error, setError] = useState('');

  const handleStudentSubmit = async (studentData) => {
    setError('');
    try {
      await axios.post(STUDENTS_API, studentData);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating student');
    }
  };

  const handleCompanySubmit = async (companyData) => {
    // CompanyForm handles its own API call
    // This callback is just for navigation after success
    navigate('/companies');
  };

  return (
    <div className="create-page-container">
      <div className="create-page-header">
        <h1>➕ Create New Record</h1>
        <p>Add a new student or company to the system</p>
      </div>

      <div className="create-tabs">
        <button
          className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => setActiveTab('student')}
        >
          👤 Create Student
        </button>
        <button
          className={`tab-btn ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          🏢 Create Company
        </button>
      </div>

      {error && (
        <div className="create-error-message">{error}</div>
      )}
      <div className="create-content">
        {activeTab === 'student' ? (
          <StudentForm onSubmit={handleStudentSubmit} onCancel={() => navigate('/students')} />
        ) : (
          <CompanyForm onSubmit={handleCompanySubmit} onCancel={() => navigate('/companies')} />
        )}
      </div>
    </div>
  );
};

export default CreatePage;

