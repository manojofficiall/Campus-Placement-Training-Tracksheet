import React from 'react';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'placed':
        return 'status-badge status-placed';
      case 'pending':
        return 'status-badge status-pending';
      case 'not placed':
        return 'status-badge status-not-placed';
      default:
        return 'status-badge status-pending';
    }
  };

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students added yet. Click "Add New Student" to get started!</p>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="student-grid">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <div className="card-header">
              <h3>{student.name}</h3>
              <span className={getStatusBadgeClass(student.placementStatus)}>
                {student.placementStatus || 'Pending'}
              </span>
            </div>
            
            <div className="card-body">
              <div className="info-row">
                <span className="label">Student ID:</span>
                <span className="value">{student.studentId}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{student.email}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{student.phone}</span>
              </div>
              
              {student.company && (
                <div className="info-row">
                  <span className="label">Company:</span>
                  <span className="value">{student.company}</span>
                </div>
              )}
              
              {student.package && (
                <div className="info-row">
                  <span className="label">Package:</span>
                  <span className="value">₹{student.package} LPA</span>
                </div>
              )}
              
              {student.placementDate && (
                <div className="info-row">
                  <span className="label">Placement Date:</span>
                  <span className="value">
                    {new Date(student.placementDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              {student.notes && (
                <div className="info-row notes">
                  <span className="label">Notes:</span>
                  <span className="value">{student.notes}</span>
                </div>
              )}
            </div>
            
            <div className="card-actions">
              <button 
                className="btn btn-edit"
                onClick={() => onEdit(student)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this student?')) {
                    onDelete(student._id);
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

export default StudentList;






