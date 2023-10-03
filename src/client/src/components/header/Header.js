import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-8 bg-gradient-to-r from-gray-700 to-gray-900 shadow">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          SkillXChange
        </Link>
        <div className="lg:hidden">
          {/* Hamburger menu icon */}
          <button
            className="text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Responsive navigation menu */}
      {menuOpen && (
        <nav className="lg:hidden">
          <ul className="text-gray-200">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
              >
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Profile
                  </Link>

                  <Link 
                    to="/skills"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Skills
                  </Link>

                  <Link 
                    to="/matching"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Matching
                  </Link>

                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:example@example.com" // Replace with your contact email address
                    className="block py-2 px-4 hover:bg-gray-800 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {/* Desktop navigation menu */}
      <nav className="hidden lg:flex lg:w-auto lg:space-x-4">
        <Link
          to="/"
          className="text-gray-200 hover:text-white"
        >
          Home
        </Link>
  
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="text-gray-200 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/skills"
              className="text-gray-200 hover:text-white"
            >
              Skills
            </Link>

            <Link
              to="/matching"
              className="text-gray-200 hover:text-white"
            >
              Matching
            </Link>

  
            <button
              onClick={handleSignOut}
              className="text-gray-200 hover:text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-200 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-200 hover:text-white"
            >
              Sign Up
            </Link>
            <a
              href="mailto:abdulrazakabu667@gmail.com" // Replace with your contact email address
              className="text-gray-200 hover:text-white"
            >
              Contact Us
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
