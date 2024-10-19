import React, { useState, useEffect } from 'react';
import './Movie.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Movies = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Open the dialog when the component mounts
  useEffect(() => {
    setIsDialogOpen(true); // Open dialog when page loads
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to the Cart page
  };

  return (
    <div>
      <h1>Movies Page</h1>

      {/* Dialog should be visible based on the state */}
      {isDialogOpen && (
        <div className="dialog"> {/* CSS class for dialog styling */}
          <button className="close-button" onClick={handleCloseDialog}>X</button>
          <h2>Access Required</h2>
          <p>You must subscribe or log in to view this page.</p>
          <button className="go-button" onClick={handleGoToCart}>Subscribe</button>
          <> or </>
          <button className="go-button" onClick={handleGoToCart}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Movies;

