# Task Management Frontend

A modern React application for task management with user authentication and real-time task operations.

## Tech Stack

- **Framework:** React 18
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Notifications:** React Toastify
- **Build Tool:** Create React App

## Features

- User authentication (Login/Signup)
- Task CRUD operations
- Real-time task filtering
- Responsive mobile design
- Loading states and error handling
- Toast notifications
- Protected routes

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app/frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (optional)
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

4. Start development server
```bash
npm start
```

Application will open at `http://localhost:3000`

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Project Structure

```
frontend/
├── public/
│   └── index.html       # Main HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   └── TaskItem.js
│   ├── context/         # State management
│   │   ├── AuthContext.js
│   │   └── TasksContext.js
│   ├── services/        # API services
│   │   └── api.js
│   ├── App.js          # Main component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json
└── tailwind.config.js
```

## Key Components

- **AuthContext**: Manages user authentication state
- **TasksContext**: Handles task operations and state
- **ProtectedRoute**: Route guard for authenticated users
- **TaskList**: Main dashboard with task display
- **TaskForm**: Modal form for creating/editing tasks

## Deployment

This frontend can be deployed to Netlify, Vercel, or any static hosting platform.

**Note**: When deploying, update the API base URL to point to your deployed backend.

## Author

Satish - Full Stack Developer
# task-manager-frontend
This repository contains the React frontend for a full-stack Task Management application. It provides a user-friendly interface for signing up, logging in, and managing tasks. The app communicates with the backend API for authentication and task operations.  Tech stack: React, Tailwind CSS, Axios, React Context 
Features:

User authentication (signup/login)
Task list, add/edit/delete tasks
Responsive design
Error handling and loading states
To run:

Install dependencies (npm install)
Set API base URL in .env
Start app (npm start)
