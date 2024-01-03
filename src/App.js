import './App.css';
import { useRoutes } from "react-router-dom";
import Login from './pages/authentication/login.jsx';
import Dashboard from './pages/dashboard.jsx';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return element;
}

export default App;
