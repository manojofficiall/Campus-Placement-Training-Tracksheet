import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import axios from 'axios';
import '../App.css';

const API_URL = 'http://localhost:5000/api/students';

const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleAddStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent._id}`, studentData);
      } else {
        await axios.post(API_URL, studentData);
      }
      fetchStudents();
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
      fetchStudents();
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
          <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
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
            <button 
              className="btn btn-primary add-btn" 
              onClick={() => setShowForm(true)}
            >
              + Add New Student
            </button>
            <StudentList 
              students={students}
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





