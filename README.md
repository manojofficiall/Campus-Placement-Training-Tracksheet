# Backend MongoDB Setup

1. Install dependencies in the backend folder:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Edit the `MONGODB_URI` in `.env` to point to your MongoDB instance if needed.

3. Start your backend server:
   ```bash
   npm start
   ```

The backend will connect to MongoDB using the URI from the `.env` file.
# 🎯 Placement Tracksheet Project

A full-stack web application for tracking student placement status and details. Built with React (frontend) and Node.js/Express with MongoDB (backend).

## Features

- ✅ Add, edit, and delete student records
- ✅ Track placement status (Pending, Placed, Not Placed)
- ✅ Store company details, package information, and placement dates
- ✅ Modern, responsive UI with gradient design
- ✅ RESTful API for all CRUD operations
- ✅ MongoDB database for data persistence

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- Modern CSS with gradients and animations
- Responsive design

### Backend
- Node.js & Express
- MongoDB with Mongoose
- CORS enabled for frontend communication
- RESTful API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the repository (if applicable)
```bash
cd "Placement Tracksheet project"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/placement-tracksheet
PORT=5000
```

**Note:** If you're using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:
- **Windows:** MongoDB should start automatically as a service
- **Mac/Linux:** Run `mongod` in a terminal

Or use MongoDB Atlas (cloud) - update the MONGODB_URI in `.env` file.

### Start the Backend Server

```bash
cd backend
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will open automatically at `http://localhost:3000`

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a single student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/health` - Health check

## Project Structure

```
Placement Tracksheet project/
├── backend/
│   ├── server.js          # Express server and routes
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Main app styles
│   │   ├── index.js       # Entry point
│   │   ├── index.css      # Global styles
│   │   └── components/
│   │       ├── StudentList.js
│   │       ├── StudentList.css
│   │       ├── StudentForm.js
│   │       └── StudentForm.css
│   └── package.json       # Frontend dependencies
└── README.md
```

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Click "Add New Student" to create a new entry
4. Fill in the student details:
   - Name, Student ID, Email, Phone (required)
   - Placement Status (required)
   - Company, Package, Placement Date, Notes (optional)
5. View all students in the card grid layout
6. Edit or delete students as needed

## Database Schema

The Student model includes:
- `name` (String, required)
- `studentId` (String, required, unique)
- `email` (String, required)
- `phone` (String, required)
- `placementStatus` (Enum: 'Pending', 'Placed', 'Not Placed')
- `company` (String, optional)
- `package` (Number, optional)
- `placementDate` (Date, optional)
- `notes` (String, optional)
- `createdAt`, `updatedAt` (automatically managed)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check services
- Verify the MONGODB_URI in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: React will prompt to use a different port

### CORS Errors
- Ensure backend server is running
- Check that CORS is enabled in `server.js`

## License

ISC

## Author

Created as a placement tracking solution.






