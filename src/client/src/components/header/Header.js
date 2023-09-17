import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gray-800 shadow">
      <Link to="/" className="text-2xl font-bold text-white">
        SkillXChange
      </Link>
      
      <button 
        className="lg:hidden block"
        onClick={toggleMenu}  
      >
        <svg
          className={`h-6 w-6 fill-current text-white ${isMenuOpen ? "hidden" : ""}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
        </svg>
    
        <svg
          className={`h-6 w-6 fill-current text-white ${!isMenuOpen ? "hidden" : ""}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    
      <div
        className={`lg:flex lg:w-auto lg:space-x-8 ${isMenuOpen ? "" : "hidden"}`}
      >
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
      </div>
    </header>
  );
}

export default Header;
