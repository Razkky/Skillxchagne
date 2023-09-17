import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider ,createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateForm } from './validiateForm';
import { POST } from './apiSignup';
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      email: name === 'email' ? value : prevData.email,
      password: name === 'password' ? value : prevData.password,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setErrorMessage(null);
  };
  

  
  const handleEmailSignup = async () => {
    try {
      // Create a function to sign up with email and password
      const emailPasswordSignUp = async (email, password) => {
        return new Promise(async (resolve, reject) => {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            resolve(userCredential);
          } catch (error) {
            reject(error);
          }
        });
      };

      // Sign up using email and password
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile: {
          fullName: formData.fullName,
        },
      };
      const userCredential = await emailPasswordSignUp(requestBody.email, requestBody.password);
      console.log('Email and Password Sign-Up successful');
      console.log(userCredential);
      
      // You can extract further user information from userCredential if needed.
      // For example: 
      console.log(requestBody);
      POST(requestBody);
      return navigate('/login');
    } catch (error) {
      const errorMessage = 'An error occurred during signup.';
      console.error(errorMessage, error);
      // Handle any unexpected errors here
    }
};

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Create a function to open the pop-up
      const openGoogleSignInPopup = async () => {
        return new Promise(async (resolve, reject) => {
          try {
            const googleUserCredential = await signInWithPopup(auth, provider);
            resolve(googleUserCredential);
          } catch (error) {
            reject(error);
          }
        });
      };
  
      // Open the pop-up
      const googleUserCredential = await openGoogleSignInPopup();
      console.log('Google Sign-In successful');
      console.log(googleUserCredential);
      // Get the user's email and Google ID
      const uid = googleUserCredential.user.uid;
      const email = googleUserCredential.user.email;
      const googleId = googleUserCredential.user.uid;
      const fullName = googleUserCredential.user.displayName;
      const requestBody = {
        username: uid,
        email: email,
        password: googleId,
        profile: {
          fullName: fullName,
        },
      };
      console.log(requestBody);
      POST(requestBody);
      return navigate('/login');
    } catch (error) {
      errorMessage = 'An error occurred during signup.';
 
      console.error('An error occurred during signup:', error);
      // Handle any unexpected errors here
    }
  };


  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-white">Signup</h2>
      <div className="mb-4 text-red-500">{errors.general}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } sm:text-sm bg-gray-900 text-white`}
          />
          <div className="text-red-500 text-sm mt-1">{errors.username}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } sm:text-sm bg-gray-900 text-white`}
          />
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } sm:text-sm bg-gray-900 text-white`}
          />
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } sm:text-sm bg-gray-900 text-white`}
          />
          <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
        </div>
      
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } sm:text-sm bg-gray-900 text-white`}
          />
          <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handleEmailSignup}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Signup
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b border-gray-300 w-1/5 lg:w-1/4"></span>
        <NavLink
          to="/login"
          className="text-sm text-gray-300 hover:text-gray-200"
        >
          Or Login
        </NavLink>
        <span className="border-b border-gray-300 w-1/5 lg:w-1/4"></span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b border-gray-300 w-1/5 lg:w-1/4"></span>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Signup with Google
        </button>
        <span className="border-b border-gray-300 w-1/5 lg:w-1/4"></span>
      </div>
    </div>
  );
}

export default Signup;