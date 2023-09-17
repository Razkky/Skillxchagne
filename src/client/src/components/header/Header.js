import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gray-800 shadow">
      <Link to="/" className="text-2xl font-bold text-white">
        SkillXChange
      </Link>
      
      <button 
        className="lg:hidden block"
        onClick={toggleMenu}  
      >
        {/* ... (SVG icons code) */}
      </button>
    
      <div
        className={`lg:flex lg:w-auto lg:space-x-8 ${isMenuOpen ? "" : "hidden"}`}
      >
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
            > 
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
