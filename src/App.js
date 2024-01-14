import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './pages/authentication/login.jsx';
import Services from './pages/Services.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Residents from './pages/Residents.jsx';
import Bills from './pages/Bills.jsx';
import Apartments from './pages/Apartments.jsx';
import Vehicles from './pages/Vehicles.jsx';
import TemporaryResidence from './pages/TemporaryResidence.jsx';
import TemporaryLeave from './pages/TemporaryLeave.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

// import { Dashboard } from '@mui/icons-material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = () => {
    return localStorage.getItem('isLogedIn');
    // return isLoggedIn;
  };

  const LogIn = () => {
    localStorage.setItem('isLogedIn', true);
  }

  let element = useRoutes([
    {
      path: "/login",
      element: <Login setLoggedIn={() => {LogIn()}} />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: isAuthenticated() ? <Navigate to="/dashboard" /> :  <Navigate to="/login" />,
    },
    {
      path: "/profile",
      element: isAuthenticated() ? <UserProfile /> :  <Navigate to="/login" />,
    },
    {
      path: "/apartment",
      element: isAuthenticated() ? <Apartments /> : <Navigate to="/login"/>,
    },
    {
      path: "/service",
      element: isAuthenticated() ? <Services /> : <Navigate to="/login"/>,
    },
    {
      path: "/resident",
      element: isAuthenticated() ? <Residents /> : <Navigate to="/login"/>,
    },
    {
      path: "/bill",
      element: isAuthenticated() ? <Bills /> : <Navigate to="/login"/>,
    },
    {
      path: "/vehicle",
      element: isAuthenticated() ? <Vehicles /> : <Navigate to="/login"/>,
    },
    {
      path: "/temporaryResidenceTable",
      element: isAuthenticated() ? <TemporaryResidence /> : <Navigate to="/login"/>,
    }, 
    {
      path: "/temporaryLeaveTable",
      element: isAuthenticated() ? <TemporaryLeave /> : <Navigate to="/login"/>,
    }
  ]);

  return element;
}

export default App;
