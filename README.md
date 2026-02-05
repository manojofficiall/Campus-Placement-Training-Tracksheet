# 🎓 Campus Placement Tracksheet

A comprehensive full-stack web application for managing campus placement activities, tracking student placements, and monitoring company recruitment processes.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## 📋 About The Project

The **Campus Placement Tracksheet** is a modern web application designed to streamline the placement management process for educational institutions. It provides a centralized platform for tracking student placements, managing company information, and generating insightful analytics about placement activities.

### 🎯 Purpose

This system helps placement cells, coordinators, and administrators to:
- **Track student placement status** in real-time
- **Manage company information** and recruitment drives
- **Monitor placement statistics** and generate reports
- **Maintain organized records** of all placement activities
- **Improve transparency** in the placement process

### ✨ Key Features

#### Current Features (v1.0)

- **🔐 User Authentication**: Secure login system for authorized access
- **👥 Student Management**: 
  - Add, edit, and delete student records
  - Track placement status (Placed/Pending/Not Placed)
  - Record company details, package information, and placement dates
  - Store student contact information and notes
- **🏢 Company Management**:
  - Maintain database of recruiting companies
  - Store company details (industry, location, website, contact info)
  - Track company-wise placement statistics
- **📊 Dashboard Overview**:
  - Real-time placement statistics
  - Visual breakdown of placement status
  - Placement rate calculation
  - Quick insights into overall performance
- **🎨 Modern UI/UX**:
  - Clean, intuitive card-based interface
  - Responsive design elements
  - Color-coded status indicators
  - Dark mode toggle on login page

---

## 🛠️ Technology Stack

### Frontend
- **React.js** (v18.2.0) - UI library
- **React Router DOM** (v6.30.2) - Client-side routing
- **Axios** (v1.6.0) - HTTP client for API calls
- **CSS3** - Custom styling and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.0.0) - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Development Tools
- **nodemon** (v3.0.1) - Auto-restart server during development
- **dotenv** (v16.3.1) - Environment variable management

---

## 📁 Project Structure

```
placement-tracksheet/
├── backend/
│   ├── server.js           # Express server & API routes
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.js
│   │   │   ├── Overview.js
│   │   │   ├── StudentsPage.js
│   │   │   ├── StudentList.js
│   │   │   ├── StudentForm.js
│   │   │   ├── CompaniesPage.js
│   │   │   ├── CompanyList.js
│   │   │   ├── CompanyForm.js
│   │   │   └── Layout.js
│   │   ├── assets/        # Images and static files
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── README.md              # Project documentation
└── UPGRADE_DEMO_GUIDE.md  # Future upgrade plans

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd placement-tracksheet
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/placement-tracksheet
   PORT=5000
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on: `http://localhost:5000`

2. **Start Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   Application opens at: `http://localhost:3000`

---

## 📖 Usage Guide

### For Placement Coordinators

1. **Login**: Access the system with your credentials
2. **Dashboard**: View overall placement statistics
3. **Add Students**: Navigate to Students page → Click "Add New Student"
4. **Update Status**: Click on student card → Edit → Update placement details
5. **Manage Companies**: Add recruiting companies and their details
6. **Monitor Progress**: Track placement rates and statistics in real-time

### Student Information Fields

- Name, Student ID (unique identifier)
- Email, Phone number
- Placement Status (Placed/Pending/Not Placed)
- Company name (if placed)
- Package in LPA (Lakhs Per Annum)
- Placement date
- Additional notes

### Company Information Fields

- Company name (unique)
- Email, Phone, Website
- Industry sector
- Location
- Description/Notes

---

## 🔮 Future Enhancements

We have exciting upgrades planned! See [UPGRADE_DEMO_GUIDE.md](UPGRADE_DEMO_GUIDE.md) for detailed demos of upcoming features:

### Planned Features

1. **🔒 Advanced Authentication**
   - JWT-based authentication
   - Role-based access control (Admin/Officer/Student)
   - Password encryption with bcrypt
   - Secure session management

2. **🔍 Search & Filter**
   - Multi-criteria search
   - Advanced filtering options
   - Pagination for large datasets
   - Sorting capabilities

3. **📊 Analytics Dashboard**
   - Interactive charts (Chart.js)
   - Placement trends over time
   - Package distribution analysis
   - Company-wise statistics
   - Department/branch-wise breakdown

4. **📤 Export Functionality**
   - Export to CSV
   - Generate PDF reports
   - Excel spreadsheet downloads
   - Customizable report templates

5. **🔔 Notification System**
   - Toast notifications (react-toastify)
   - Email notifications
   - Real-time updates
   - Interview reminders

6. **📅 Interview Tracking**
   - Schedule interview rounds
   - Track interview status
   - Store interviewer feedback
   - Calendar integration

7. **🎨 UI/UX Improvements**
   - Full dark mode support
   - Mobile-responsive design
   - Loading states and skeletons
   - Better error handling

8. **🔐 Security Enhancements**
   - Input validation and sanitization
   - Rate limiting
   - CORS whitelist
   - API security best practices

9. **🧪 Testing & Quality**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests
   - Code coverage

10. **🚀 Deployment**
    - Docker containerization
    - CI/CD pipeline
    - Production optimization
    - Monitoring and logging

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 API Endpoints

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Health Check
- `GET /api/health` - Server health status

---

## 📊 Database Schema

### Student Model
```javascript
{
  name: String (required),
  studentId: String (required, unique),
  email: String (required),
  phone: String (required),
  placementStatus: String (enum: ['Pending', 'Placed', 'Not Placed']),
  company: String,
  package: Number (in LPA),
  placementDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Company Model
```javascript
{
  name: String (required, unique),
  email: String (required),
  phone: String (required),
  website: String,
  industry: String,
  location: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Known Issues

- Authentication currently uses a dummy token system (will be replaced with JWT)
- No pagination implemented yet (loads all records)
- Limited mobile responsiveness

---

## 📜 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Author

**Dinesh**

---

## 🙏 Acknowledgments

- Built with the MERN stack
- Inspired by the need for efficient placement management
- Thanks to all contributors and testers

---

## 📞 Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Check existing documentation
- Review the [UPGRADE_DEMO_GUIDE.md](UPGRADE_DEMO_GUIDE.md) for planned features

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Last Updated**: January 30, 2026  
**Version**: 1.0.0  
**Status**: Active Development
