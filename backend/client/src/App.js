import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginPage from './components/login/Login';
import SignupPage from './components/signup/Signup';
import Hero from './components/hero/Hero';
import Header from './components/header/Header';
import UserProfile from './components/profile/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="container mx-auto flex flex-col md:flex-row p-4 mt-4">
          <div className="w-full p-4 bg-gray-200 shadow-md rounded-md mb-4">
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