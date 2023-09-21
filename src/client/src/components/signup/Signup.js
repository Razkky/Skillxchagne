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
    <main className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <section className="max-w-md w-full space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
      <div className="mb-6">
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 py-2 px-4 rounded-md">
            {errors.general}
          </div>
        )}
      </div>
      <form>
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              id: 'username',
              label: 'Username',
              type: 'text',
              value: formData.username,
              error: errors.username,
            },
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              value: formData.email,
              error: errors.email,
            },
            {
              id: 'password',
              label: 'Password',
              type: 'password',
              value: formData.password,
              error: errors.password,
            },
            {
              id: 'confirmPassword',
              label: 'Confirm Password',
              type: 'password',
              value: formData.confirmPassword,
              error: errors.confirmPassword,
            },
            {
              id: 'fullName',
              label: 'Full Name',
              type: 'text',
              value: formData.fullName,
              error: errors.fullName,
            },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-800">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.label}
                value={field.value}
                onChange={handleInputChange}
                className={`
                  w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none
                  ${field.error ? 'border-red-500' : 'border-gray-300'}
                  sm:text-sm bg-gray-100 text-gray-800
                `}
              />
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error}</p>
              )}
            </div>
          ))}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleEmailSignup}
              className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-gray-200 font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="mt-6 flex items-center justify-between">
        <hr className="w-1/4 border-gray-300" />
        <p className="text-sm text-gray-800">Or</p>
        <hr className="w-1/4 border-gray-300" />
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-800 text-gray-100 font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-red-300"
        >
          Sign Up with Google
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-800">
          Already have an account?{' '}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Log in here
          </NavLink>
        </p>
      </div>
    </div>
    </section>
  </main>
  );
  
  
}

export default Signup;