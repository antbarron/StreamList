import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const [error, setError] = useState(null);

const handleLoginFailure = (error) => {
  setError('Login failed. Please try again.');
  console.error(error);
};

const Login = () => {
  // Handle success or error during the login attempt
  const handleLoginSuccess = (response) => {
    const token = response.credential; 
    if (token) {
      localStorage.setItem('authToken', token); // Store the token
      navigate('/'); // redirect to home page
    }};
  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <GoogleLogin 
  onSuccess={handleLoginSuccess} 
  onError={handleLoginFailure} 
  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
/>

    </div>
  );
};

export default Login;
