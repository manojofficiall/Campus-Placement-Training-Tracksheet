import React from 'react';
import './CompanyList.css';

const CompanyList = ({ companies, onEdit, onDelete }) => {
  if (companies.length === 0) {
    return (
      <div className="empty-state">
        <p>No companies added yet. Click "Add New Company" to get started!</p>
      </div>
    );
  }

  return (
    <div className="company-list-container">
      <div className="company-grid">
        {companies.map((company) => (
          <div key={company._id} className="company-card">
            <div className="card-header">
              <h3>{company.name}</h3>
            </div>
            
            <div className="card-body">
              {company.industry && (
                <div className="info-row">
                  <span className="label">Industry:</span>
                  <span className="value">{company.industry}</span>
                </div>
              )}
              
              {company.email && (
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{company.email}</span>
                </div>
              )}
              
              {company.phone && (
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{company.phone}</span>
                </div>
              )}
              
              {company.website && (
                <div className="info-row">
                  <span className="label">Website:</span>
                  <span className="value">
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      {company.website}
                    </a>
                  </span>
                </div>
              )}
              
              {company.location && (
                <div className="info-row">
                  <span className="label">Location:</span>
                  <span className="value">{company.location}</span>
                </div>
              )}
              
              {company.description && (
                <div className="info-row notes">
                  <span className="label">Description:</span>
                  <span className="value">{company.description}</span>
                </div>
              )}
            </div>
            
            <div className="card-actions">
              <button 
                className="btn btn-edit"
                onClick={() => onEdit(company)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this company?')) {
                    onDelete(company._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;





