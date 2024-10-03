import React, { useState } from 'react';
import './StreamList.css'; // Relative path if StreamList.js and StreamList.css are in the same folder

const StreamList = () => {
  const [input, setInput] = useState(''); // To store the current input
  const [inputList, setInputList] = useState([]); // To store the list of submitted inputs

  const handleInputChange = (event) => {
    setInput(event.target.value); // Update input state
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    setInputList([...inputList, input]); // Add the current input to the inputList array
    setInput(''); // Clear the input field after submission
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
          placeholder="Enter something..." 
        className="input-box" // Add class for styling
        />
        <button type="submit" className="submit-button">Submit</button>
        </form>
      
      {/* Display the list of submitted inputs */}
      <ul className="input-list">
        {inputList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
