import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './Components/Pages/Dashboard/Dashboard.js';
import Timetable from './Components/Pages/Timetable/Timetable.js';
import Tasks from './Components/Pages/Tasks/Tasks.js';
import Signup from './Components/Pages/Auth/Signup.js';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';

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
    element: <Signup />,
    loader: async () => {
      const response = await fetch('http://localhost:4000/auth/checktoken', {
        method: 'GET',
        credentials: 'include'
      });

      if ((await response.json()).result === true) {
        throw new Error('wasd');
      }
    },
    errorElement: <Navigate to={"/dashboard"} />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);