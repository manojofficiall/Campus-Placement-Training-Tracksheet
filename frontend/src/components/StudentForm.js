import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    placementStatus: 'Pending',
    company: '',
    package: '',
    placementDate: '',
    notes: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        studentId: student.studentId || '',
        email: student.email || '',
        phone: student.phone || '',
        placementStatus: student.placementStatus || 'Pending',
        company: student.company || '',
        package: student.package || '',
        placementDate: student.placementDate ? student.placementDate.split('T')[0] : '',
        notes: student.notes || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter student's full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="studentId">Student ID *</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                placeholder="Enter student ID"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="placementStatus">Placement Status *</label>
              <select
                id="placementStatus"
                name="placementStatus"
                value={formData.placementStatus}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Placed">Placed</option>
                <option value="Not Placed">Not Placed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="package">Package (LPA)</label>
              <input
                type="number"
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="Enter package in LPA"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="placementDate">Placement Date</label>
              <input
                type="date"
                id="placementDate"
                name="placementDate"
                value={formData.placementDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Additional notes or comments..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;


