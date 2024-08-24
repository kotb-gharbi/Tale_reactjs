import './App.css';
import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import { createBrowserRouter , RouterProvider ,Navigate } from 'react-router-dom';
import Dash from './components/Dash.jsx';
import Roles from './components/Roles.jsx';
import Users from './components/Users.jsx';
import Sanctions from './components/Sanctions.jsx';
import Reclamations from './components/Reclamations.jsx';
import Approbation from './components/Approbation.jsx';
import Analyse from './components/Analyse.jsx';
import Support from './components/Support.jsx';
import EditProfile from './components/EditProfile.jsx';
import NoPageFound from './components/NoPageFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AddUserFormProvider } from './components/AddUserFormContext.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NoPageFound />,
  },
  {
    path: '/sidebar',
    element: <ProtectedRoute element={<Navbar/>} />,
    children : [
      {
        path: '',
        element: <Navigate to="/sidebar/dashboard" />,
      },
      {
        path: '/sidebar/dashboard',
        element: <ProtectedRoute element={<Dash/>} />,
      },
      {
        path: '/sidebar/gestion-des-utilisateurs',
        element: <ProtectedRoute element={<Users />} />,
      },
      {
        path: '/sidebar/gestion-des-utilisateurs/:id',
        element: <ProtectedRoute element={<EditProfile />} />,
      },
      {
        path: '/sidebar/sanctions',
        element: <ProtectedRoute element={<Sanctions />} />,
      },
      {
        path: '/sidebar/reclamations',
        element: <ProtectedRoute element={<Reclamations />} />,
      },
      {
        path: '/sidebar/approbation',
        element: <ProtectedRoute element={<Approbation />} />,
      },
      {
        path: '/sidebar/roles',
        element: <ProtectedRoute element={<Roles />} />,
      },
      {
        path: '/sidebar/analyse',
        element: <ProtectedRoute element={<Analyse />} />,
      },
      {
        path: '/sidebar/support',
        element: <ProtectedRoute element={<Support />} />,
      },
      
    ]
  }
])

function App() {

  return (
    <>
      <AddUserFormProvider>
        <RouterProvider router={router} />
      </AddUserFormProvider>
    </>
    
  );
}

export default App;
