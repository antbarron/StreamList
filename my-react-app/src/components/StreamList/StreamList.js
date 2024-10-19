import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './StreamList.css'; // Relative path if StreamList.js and StreamList.css are in the same folder

const StreamList = () => {
  const [input, setInput] = useState(''); // To store the current input
  const [inputList, setInputList] = useState([]); // To store the list of submitted inputs
  const navigate = useNavigate(); // Initialize navigate
  const [isDialogOpen, setIsDialogOpen] = useState(false); // <-- This is important to manage dialog visibility

  const handleInputChange = (event) => {
    setInput(event.target.value); // Update input state
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    if (input.trim()) { // Only add non-empty inputs
      setInputList([...inputList, input]); // Add the current input to the inputList array
      setInput(''); // Clear the input field after submission
    }
  };

  // Remove item from the list at the given index
  const handleRemove = (index) => {
    setInputList(inputList.filter((_, i) => i !== index)); // Filter out the item at the given index
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog when "X" is clicked
  };
  const handleClick = () => {
    setIsDialogOpen(true); // Open dialog when button is clicked
  };
 
  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to the Cart page
  };
  const handleGoToMovie = () => {
    navigate('/Movies'); // Navigate to the Movie page
  };
  
  return (
    <div>

    <div className="header-container">
      <span className="material-symbols-outlined">theaters</span>
      <h1 className="inline-heading">Stream List</h1>
      <span className="material-symbols-outlined">theaters</span>
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Movie" 
        className="input-box" // Add class for styling
        />
        <button type="submit" className="submit-button">Add Movie</button>
        <button type="button" className="save-button" onClick={handleGoToMovie}>Save List</button> {/* Save button */}
        </form>
      
        <ul className="input-list">
  {inputList.map((item, index) => (
    <li key={index} className="list-item">
      <span>{item}</span> {/* User input */}
      <div className="button-container">
      <button className="play-button" onClick={handleClick}>Play</button> {/* Play button */}
      <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button> {/* Remove item from list */}
      </div>
      </li>
  ))}
</ul>


      {/* Dialog for subscription */}
      {isDialogOpen && (
        <div className="dialog">
          <button className="close-button" onClick={handleCloseDialog}>X</button> {/* X button to close dialog */}
          {/*<h2 className="dialog-title"> Customer Plans</h2>*/}
          <button className="go-button" onClick={handleGoToCart}>Subscribe</button> 
          <> or </>
          <button className="go-button" onClick={handleGoToCart}>Login</button> 

        </div>
      )}
    </div>
  );
};

export default StreamList;
