import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './Components/Pages/Dashboard/Dashboard.js';
import Timetable from './Components/Pages/Timetable/Timetable.js';
import Tasks from './Components/Pages/Tasks/Tasks.js';
import Signup from './Components/Pages/Auth/Signup.js';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: async () => {
          return fetch('http://localhost:4000/api/dashboard');
        }
      },
      {
        path: 'timetable',
        element: <Timetable />
      },
      {
        path: 'tasks',
        element: <Tasks />
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);