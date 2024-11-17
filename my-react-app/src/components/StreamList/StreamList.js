import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import axios from 'axios';
import './StreamList.css';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [inputList, setInputList] = useState([]);
  const [editText, setEditText] = useState(''); // To store the current text when editing
  const [editId, setEditId] = useState(null); // To track which item is being edited
  const [message, setMessage] = useState(''); // To store feedback messages
  const [listName, setListName] = useState(''); // New state for list name
  const [showSaveInput, setShowSaveInput] = useState(false); // Toggle for list name input
  const [savedLists, setSavedLists] = useState([]);
  const [showSavedListsModal, setShowSavedListsModal] = useState(false); // Toggle modal visibility
  const [editSavedLists, setEditSavedLists] = useState(false); // Tracks edit mode for saved lists
  const navigate = useNavigate();
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; 
  const TMDB_API = '55c3657d92dd22cabb8b1efba6e60e6a';
  
 // Load inputList and savedLists from localStorage on component mount
useEffect(() => {
  const storedInputList = JSON.parse(localStorage.getItem('inputList')) || [];
  const storedSavedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
  setInputList(storedInputList);
  setSavedLists(storedSavedLists);
}, []);
// Save inputList to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('inputList', JSON.stringify(inputList));
}, [inputList]);
// Save savedLists to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('savedLists', JSON.stringify(savedLists));
}, [savedLists]);
useEffect(() => {
  // Find the index of the list in savedLists that matches the current listName
  const currentListIndex = savedLists.findIndex(list => list.id === listName);
  // Check if the list was found and if its items are different from inputList
  if (currentListIndex !== -1 && savedLists[currentListIndex].items !== inputList) {
    // Create a copy of savedLists to avoid mutating the original state
    const updatedLists = [...savedLists];
    // Update the specific list in the copied array by creating a new object
    updatedLists[currentListIndex] = {
      ...updatedLists[currentListIndex],
      items: inputList
    };
    // Update the savedLists state with the modified array, which triggers a re-render
    setSavedLists(updatedLists); 
  }
  // The useEffect will re-run when any dependency changes
}, [inputList, listName, savedLists]);

  // Function to save a list
  const handleSaveList = () => {
    if (listName.trim()) {
      const newList = {
        id: uuidv4(),
        name: listName,
        items: inputList,
      };
      setSavedLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        setMessage('List saved successfully!');
        setTimeout(() => setMessage(''), 2000);
        return updatedLists;
      });
      setListName('');
      setInputList([]);
      setShowSaveInput(false);
    } else {
      console.error("List name is empty or invalid.");
    }
  };
  const handleShowSaveInput = () => {
    setShowSaveInput(true);
    setListName('');
  };
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
    // Create a new list by filtering out the item with the specified id
    const updatedList = inputList.filter(item => item.id !== id);
    // Update the input list state to reflect the new list after removing the item
    setInputList(updatedList);  
    // Display a success message indicating that the movie was removed
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
    // Check if the edit text is not empty and if there is a valid edit ID
    if (editText.trim() && editId) {
        // Create a new list by mapping over the current input list
        // Update the text of the item that matches the editId
        const updatedList = inputList.map(item => 
            item.id === editId ? { ...item, text: editText } : item
        );
        // Update the input list state to the newly updated list
        setInputList(updatedList); 
        // Retrieve the saved lists from local storage, or initialize an empty object if none exist
        const savedLists = JSON.parse(localStorage.getItem('savedLists')) || {};
        // Update the saved lists in local storage with the new input list for the current list name
        savedLists[listName] = updatedList;  
        localStorage.setItem('savedLists', JSON.stringify(savedLists));// Save the updated lists back to local storage
        setEditText('');
        setEditId(null);
        setMessage('Movie edited successfully!');
        setTimeout(() => setMessage(''), 1000);
    }};

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
  
  const handleMovieReviews = async (movieTitle) => {
    try {
        // Fetch movie details using the title to get the movie ID
        const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API}&query=${encodeURIComponent(movieTitle)}`);
        
        const movie = searchResponse.data.results[0]; // Get the first search result
        if (movie) {
            const movieId = movie.id; // Extract movieId
            const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API}`);
            const reviews = reviewsResponse.data.results;

            // Navigate to the Movies component and pass reviews and movie title
            navigate(`/movie/${movieId}`, { state: { reviews, movieTitle } });
        } else {
            console.error("Movie not found");
        }
    } catch (error) {
        console.error("Error fetching movie reviews:", error);
    }
};


  // Loads selected saved list items into the main list
  const handleSelectSavedList = (selectedList) => {
    setInputList(selectedList.items); // Load selected list items
    setListName(selectedList.id); // Set the current list name to allow updates
    setShowSavedListsModal(false); // Close modal
  };
  // Toggles the edit mode for saved lists
  const handleEditSavedLists = () => {
    setEditSavedLists(!editSavedLists); // Toggle the edit mode state
  };
  // Removes a saved list from the repository by ID
   const handleRemoveSavedList = (id) => {
   const updatedLists = savedLists.filter(list => list.id !== id); // Remove the list by id
   setSavedLists(updatedLists); // Update state  
  // Update local storage
   const storedLists = JSON.parse(localStorage.getItem('savedLists')) || {};
   delete storedLists[id]; // Remove from local storage
   localStorage.setItem('savedLists', JSON.stringify(storedLists));
  };
  const handleSaveAndClear = () => {
  handleSaveList(); // Call the save list function
  setInputList([]);
  };
  const handleViewSavedLists = () => {
  const lists = JSON.parse(localStorage.getItem('savedLists')) || [];
  setSavedLists(lists);
  console.log('Loaded savedLists:', lists);
  setShowSavedListsModal(true);
  };

  return (
    <div className="stream-list-container">
      <div className="header-container">
        <span className="material-symbols-outlined">theaters</span>
        <h1 className="inline-heading">StreamList</h1>
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
    
    {showSaveInput ? (
        <div>
            <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter List Name"
                className="input-box"
            />
            <button type="button" onClick={handleSaveList} className="submit-button">Save List</button>
        </div>
    ) : (
        <button className="save-button" onClick={handleShowSaveInput}>Save StreamList</button>
    )}

    {/* Wrap all buttons in a container for horizontal alignment */}
    <div className="button-container">
        <button className="save-button" onClick={handleViewSavedLists}>View My StreamLists</button>
        <button className="save-button" onClick={handleSaveAndClear}>Create New StreamList</button>
    </div>
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
              <button className="reviews-button" onClick={() => handleMovieReviews(item.text)}>
              <span className="material-symbols-outlined">reviews</span> </button>
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
  {/* Saved Lists Modal - Displays a modal for selecting or editing saved lists */}
{showSavedListsModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>My StreamLists</h2>

            {/* Button to toggle between edit and view modes for saved lists */}
            <button onClick={handleEditSavedLists}>
                {editSavedLists ? 'Done Editing' : 'Edit Lists'}
            </button>

            {/* List of saved lists */}
            <ul>
                {Array.isArray(savedLists) && savedLists.length > 0 ? (
                    savedLists.map((list, index) => (
                        <li key={index} className="saved-list-item">
                            {/* Button to select list, styled to show text */}
                            <button 
                                className="saved-list-name" 
                                onClick={() => handleSelectSavedList(list)}
                            >
                                {list.name}
                            </button>

                            {/* Edit and remove options when in edit mode */}
                            {editSavedLists && (
                                <div className="button-container">
                                    <button 
                                        className="saved-list-button" 
                                        onClick={() => handleRemoveSavedList(list.id)}
                                    >
                                        <span className="material-symbols-outlined">remove_selection</span>
                                    </button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No saved lists available</p>
                )}
            </ul>

{/* Close button to exit the modal and return to the main view */}
<button onClick={() => setShowSavedListsModal(false)}>Close</button>

        </div>
    </div>
)}


    </div>
  );
};

export default StreamList;
