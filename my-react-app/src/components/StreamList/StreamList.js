import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import './StreamList.css';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [inputList, setInputList] = useState([]);
  const [editText, setEditText] = useState(''); // To store the current text when editing
  const [editId, setEditId] = useState(null); // To track which item is being edited
  const [message, setMessage] = useState(''); // To store feedback messages
  const navigate = useNavigate();
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; 

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();//avoid page reload
    if (input.trim()) {
          // Update the inputList state by adding a new movie object with a unique ID and the entered text
      setInputList([...inputList, { id: uuidv4(), text: input }]);
      setInput('');
      setMessage('Movie added successfully!');
      setTimeout(() => setMessage(''), 1000);// Remove the message after 1 second
    }
  };

  const handleRemove = (id) => {
    setInputList(inputList.filter((item) => item.id !== id));
    setMessage('Movie removed successfully!');
    setTimeout(() => setMessage(''), 1000);
  };

  const handleEdit = (id) => {
      // Locate the item in the inputList that matches the provided ID.
    const itemToEdit = inputList.find((item) => item.id === id);
    // Set editText state with curent name in the input field and allows changes
    setEditText(itemToEdit.text);  
    setEditId(id);  // Update editId state to track which movie is currently being edited.
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    //loops over items in inputList. For every element, the function inside the map() is called.
    if (editText.trim() && editId) {
      setInputList(inputList.map(item => 
       //checks if current item's id matches, creates a copy of item object and updates with editText.
        item.id === editId ? { ...item, text: editText } : item//Otherwise unchanged
      ));
      setEditText('');
      setEditId(null);
      setMessage('Movie edited successfully!');
      setTimeout(() => setMessage(''), 1000);
    }
  };

  const handleEditCancel = () => {
    setEditText('');// Clear the editText state
    setEditId(null);  // Set editId to null to indicate that no movie is currently in the editing state.
  };

  const handleSearchMovie = async (movieTitle) => {
    // Fetch search results from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(movieTitle)}&key=${YOUTUBE_API_KEY}`
    );
    // Parse the JSON data from the response
    const data = await response.json();
    // Navigate to the movie detail page, passing the search results as state
    navigate(`/movie/${movieTitle}`, { state: { searchResults: data.items } }); 
  };
  

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="stream-list-container">
      <div className="header-container">
        <span className="material-symbols-outlined">theaters</span>
        <h1 className="inline-heading">Stream List</h1>
        <span className="material-symbols-outlined">theaters</span>
      </div>

      {message && <p className="feedback-message">{message}</p>} {/* Feedback message */}

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Movie"
          className="input-box"
        />
        <button type="submit" className="submit-button">Add Movie</button>
        <button type="button" className="save-button" onClick={handleGoToCart}>Save List</button>
      </form>
      <ul className="input-list">
        {inputList.map((item) => (// iterates over each item in the inputList array.
         // `item.id` comes from the `id` property of each object in the `inputList` state array,
        //key prop uses it for each <li> element to optimize list rendering and updates.
         <li key={item.id} className="input-list li">
      {/* Displays the text of the movie */}
      <span>{item.text}</span>
            <div className="button-container">
              <button className="play-button" onClick={() => handleSearchMovie(item.text)}>
              <span className="material-symbols-outlined">slideshow</span> </button>
              <button className="remove-button" onClick={() => handleRemove(item.id)}> 
                 <span className="material-symbols-outlined">remove_selection</span> </button>
              <button className="edit-button" onClick={() => handleEdit(item.id)}>
              <span className="material-symbols-outlined">edit_square</span> </button>
            </div>
        {/* Edit form (only visible when editing an item) */}
        {editId && (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}//<input> binds to editText state var React manages and update
            onChange={(e) => setEditText(e.target.value)}// Updates editText state as the user types
            placeholder="Edit Movie"
            className="edit-input-box"
          />
          <button type="submit" className="edit-submit-button">Submit Edit</button>
          <button type="button" className="cancel-button" onClick={handleEditCancel}>Cancel</button>
        </form>
        )}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
