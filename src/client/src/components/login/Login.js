import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
function Login() {
  const REACT_APP_LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Please fill in the required fields.');
    } else {
      setErrorMessage(null);
    }

    return Object.keys(newErrors).length === 0;
  };

  // Function to handle login with Firebase
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        console.log('Logging in user through Firebase');

        // Authenticate using Firebase
        try {
          await handleServerLogin(auth, formData.email, formData.password);
          console.log('Firebase authentication successful');
        } catch (error) {
          console.log('Firebase authentication failed');
          console.log(error);
          // Handle Firebase authentication failure using the response structure
          setErrorMessage('Incorrect Email or Password');
          return;
        }

        // Call a function to handle server login
        await handleServerLogin();
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      // Authenticate using Firebase Google Sign-In
      const provider = new GoogleAuthProvider();
      const googleUserCredential = await signInWithPopup(auth, provider);

      console.log('Google Sign-In successful');

      // Call a function to handle server login
      await handleServerLogin('google', googleUserCredential.user.email, googleUserCredential.user.uid);
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setErrorMessage('An error occurred during Google Sign-In.');
    }
  };

  // Function to handle server login
  const handleServerLogin = async (authProvider = 'email', email = formData.email, password = formData.password) => {
    try {
      // Send data to your API for database synchronization
      console.log('Logging in user through the server');
      console.log('authProvider', authProvider);
      console.log('email', email);
      console.log('password', password);
      const requestBody = {
        email: email,
        password: password
      };
        console.log('requestBody', requestBody);
      const response = await fetch(REACT_APP_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('Server login result:', result);
      console.log('Server login response:', response);
      console.log('Server login status:', response.status);
      if (response.status === 200) {
        console.log('Server login successful');

        // Save the JWT token received from the server
        const token = result.token; // Assuming the token field in the response JSON is named 'token'
        console.log('token', token);
        // Store the token in local storage or a secure storage mechanism
        localStorage.setItem('authToken', token); // Store the token in localStorage

        navigate('/profile');
      } else if (response.status === 409) {
        console.log('User already exists:', result.message);
        setErrorMessage(result.message);
      } else {
        console.log('Error creating user:', result.error);
        setErrorMessage('An error occurred during login.');
      }
    } catch (error) {
      console.error('Server login error:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <>
      <main className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Login</h2>
            {errorMessage && (
              <div className="mb-4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Login
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              No account yet? {' '}
              <NavLink to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </NavLink>
            </p>
            <div className="flex items-center justify-center mt-6">
              <div className="border-t border-gray-300 w-1/3"></div>
              <div className="text-gray-500 mx-3">Or</div>
              <div className="border-t border-gray-300 w-1/3"></div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
  
}

export default Login;
