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



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <NoPageFound />,
  },
  {
    path: '/sidebar',
    element: <Navbar />,
    children : [
      {
        path: '',
        element: <Navigate to="/sidebar/dashboard" />,
      },
      {
        path: '/sidebar/dashboard',
        element: <Dash />,
      },
      {
        path: '/sidebar/gestion-des-utilisateurs',
        element: <Users />,
      },
      {
        path: '/sidebar/gestion-des-utilisateurs/:id',
        element: <EditProfile />
      },
      {
        path: '/sidebar/sanctions',
        element: <Sanctions />,
      },
      {
        path: '/sidebar/reclamations',
        element: <Reclamations />,
      },
      {
        path: '/sidebar/approbation',
        element: <Approbation />,
      },
      {
        path: '/sidebar/roles',
        element: <Roles />,
      },
      {
        path: '/sidebar/analyse',
        element: <Analyse />,
      },
      {
        path: '/sidebar/support',
        element: <Support />,
      },
      
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
    
  );
}

export default App;
