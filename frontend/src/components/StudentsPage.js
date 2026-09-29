import React, { useState, useEffect, useCallback } from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import axios from 'axios';
import '../App.css';

const API_URL = 'https://campus-placement-training-tracksheet.onrender.com/api/students';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = useCallback(() => {
    let filtered = students;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter(student =>
        (student.name || '').toLowerCase().includes(search) ||
        (student.studentId || '').toLowerCase().includes(search) ||
        (student.email || '').toLowerCase().includes(search) ||
        (student.company || '').toLowerCase().includes(search)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(
        student => student.placementStatus === statusFilter
      );
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  const handleAddStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await axios.put(
          `${API_URL}/${editingStudent._id}`,
          studentData
        );
      } else {
        await axios.post(API_URL, studentData);
      }

      await fetchStudents();
      setShowForm(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error saving student. Please try again.');
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              color: 'white',
              padding: '50px'
            }}
          >
            Loading students...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>👥 Students Management</h1>
          <p>Manage student records and placement status</p>
        </header>

        {!showForm ? (
          <>
            <div className="controls-section">
              <button
                className="btn btn-primary add-btn"
                onClick={() => setShowForm(true)}
              >
                + Add New Student
              </button>

              <div className="search-filter-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="🔍 Search by name, ID, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="filter-box">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="status-filter"
                  >
                    <option value="All">All Status</option>
                    <option value="Placed">Placed</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Placed">Not Placed</option>
                  </select>
                </div>
              </div>

              {(searchTerm || statusFilter !== 'All') && (
                <div className="filter-info">
                  Showing {filteredStudents.length} of {students.length} students

                  {searchTerm && (
                    <span> • Search: "{searchTerm}"</span>
                  )}

                  {statusFilter !== 'All' && (
                    <span> • Status: {statusFilter}</span>
                  )}

                  <button
                    className="btn-clear-filters"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('All');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            <StudentList
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          </>
        ) : (
          <StudentForm
            student={editingStudent}
            onSubmit={handleAddStudent}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
