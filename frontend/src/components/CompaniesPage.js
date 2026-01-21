import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyList from './CompanyList';
import CompanyForm from './CompanyForm';
import axios from 'axios';
import '../App.css';

const API_URL = 'http://localhost:5000/api/companies';

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(API_URL);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (companyData) => {
    try {
      if (editingCompany) {
        await axios.put(`${API_URL}/${editingCompany._id}`, companyData);
      } else {
        await axios.post(API_URL, companyData);
      }
      fetchCompanies();
      setShowForm(false);
      setEditingCompany(null);
    } catch (error) {
      console.error('Error saving company:', error);
      alert('Error saving company. Please try again.');
    }
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleDeleteCompany = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Error deleting company. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="container">
          <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
            Loading companies...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>🏢 Companies Management</h1>
          <p>Manage company records and information</p>
        </header>

        {!showForm ? (
          <>
            <button 
              className="btn btn-primary add-btn" 
              onClick={() => setShowForm(true)}
            >
              + Add New Company
            </button>
            <CompanyList 
              companies={companies}
              onEdit={handleEditCompany}
              onDelete={handleDeleteCompany}
            />
          </>
        ) : (
          <CompanyForm 
            company={editingCompany}
            onSubmit={handleAddCompany}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;





