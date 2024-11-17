import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// PrivateRoute component is a wrapper around React Router's Route component
// It is used to restrict access to certain routes for authenticated users only.
const PrivateRoute = ({ children, ...rest }) => {
  // Check if the user is authenticated by retrieving the 'authToken' from localStorage.
  // In a real application, you might use context or state management for this.
  const isAuthenticated = localStorage.getItem('authToken'); 

  return (
    // The Route component is used to define the path and behavior of the private route.
    <Route 
      {...rest} // Spread operator ensures any other props passed to PrivateRoute are forwarded to Route.
      render={({ location }) => 
        // If the user is authenticated, render the child components (the protected content).
        // If not, redirect to the login page with the current location state.
        isAuthenticated ? (
          children
        ) : (
          // Redirect the user to the login page if they are not authenticated.
          // The state includes the location object so that after successful login,
          // the user can be redirected back to the page they originally wanted to access.
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
