import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/Login';
import SignupPage from './components/signup/Signup';
import Hero from './components/hero/Hero';
import Header from './components/header/Header';
import UserProfile from './components/profile/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen flex flex-col text-white">
      <Router>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <main className="container mx-auto flex flex-col md:flex-row p-4 mt-4">
          <div className="w-full p-4 bg-gradient-to-br from-gray-500 via-gray-800 to-gray-700
          rounded-lg shadow-lg">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            </Routes>
          </div>
        </main>
        <footer className="bg-blue-600 text-white py-4 text-center mt-auto">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;