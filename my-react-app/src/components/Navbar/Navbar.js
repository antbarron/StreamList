import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Navbar.css';
import logo300 from '../../logo/EZtechmov-300.png';
import logo600 from '../../logo/EZtechmov-600.png';
import logo900 from '../../logo/EZtechmov-900.png';

const Navbar = () => {
  const navigate = useNavigate();
  
  const [logo, setLogo] = React.useState(logo300); // Default logo
  const isAuthenticated = localStorage.getItem('authToken');
  
  // Handle successful login
  const handleLoginSuccess = (response) => {
    const token = response.credential;
    if (token) {
      localStorage.setItem('authToken', token); // Save the token in localStorage
      navigate('/'); // Redirect to home page after login
    }
  };

  // Handle login failure
  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  React.useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth >= 900) {
        setLogo(logo900);
      } else if (window.innerWidth >= 600) {
        setLogo(logo600);
      } else {
        setLogo(logo300);
      }
    };

    updateLogo();
    window.addEventListener('resize', updateLogo);

    return () => window.removeEventListener('resize', updateLogo);
  }, []);

  return (
    <nav className="navbar">
      <img src={logo} alt="EZtechmov Logo" className="navbar-logo" />
    
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
        
        {/* Conditional rendering based on authentication */}
        {!isAuthenticated ? (
          <li>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}

            />
          </li>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
