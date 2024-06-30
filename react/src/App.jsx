import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Signup';
import UploadForm from './pages/UploadForm';
import MyCollection from './pages/MyCollection';
import EditImage from './pages/EditImage';
import Landingpage from './pages/Landingpage';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  // Define paths where the navbar should not be displayed
  const noNavbarPaths = ['/', '/login', '/register'];

  return (
    <div className="app-container flex">
      
      <div className="main-container flex">
        {/* Conditionally render the sidebar */}
        {!noNavbarPaths.includes(location.pathname) && (
          <Sidebar />
        )}

        <div className=" flex-1">
        {!noNavbarPaths.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/upload" element={isAuthenticated ? <UploadForm /> : <Navigate to="/login" />} />
            <Route path="/my-collection" element={isAuthenticated ? <MyCollection /> : <Navigate to="/login" />} />
            <Route path="/edit-image/:id" element={isAuthenticated ? <EditImage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
