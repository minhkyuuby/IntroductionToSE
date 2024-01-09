import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './pages/authentication/login.jsx';
import Services from './pages/Services.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Residents from './pages/Residents.jsx';
import Bills from './pages/Bills.jsx';
import Apartments from './pages/Apartments.jsx';
import Vehicles from './pages/Vehicles.jsx';

function App() {
  let element = useRoutes([
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/apartment",
      element: <Apartments />,
    },
    {
      path: "/service",
      element: <Services />,
    },
    {
      path: "/resident",
      element: <Residents />,
    },
    {
      path: "/bill",
      element: <Bills />,
    },
    {
      path: "/vehicle",
      element: <Vehicles />,
    }
  ]);

  return element;
}

export default App;
