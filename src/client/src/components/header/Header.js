import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gray-800 shadow">
      <Link to="/" className="text-2xl font-bold text-white">
        SkillXChange
      </Link>
    
      <nav className="lg:flex lg:w-auto lg:space-x-8">
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
            <a
              href="mailto:example@example.com" // Replace with your contact email address
              className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
            >
              Contact Us
            </a>
          </>
        ) : (
          <>
            <a
              href="mailto:example@example.com" // Replace with your email address
              className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
            >
              Profile
            </a>

            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-gray-200 font-medium rounded hover:bg-gray-700 hover:text-white"
            >
              Sign Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
