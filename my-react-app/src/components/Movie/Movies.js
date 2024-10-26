import React, { useState } from 'react';
import './Movie.css';
//access the location object to retrieve state passed during navigation
import { useLocation } from 'react-router-dom';

const Movies = () => {
   const location = useLocation();// retrieves data about the current route
   //Access searchResults from location.state objec to render results from user's previous actions.
    const { searchResults } = location.state || { searchResults: [] };
    //initializes a state variable named selectedVideo with a default value of null
    const [selectedVideo, setSelectedVideo] = useState(null);//State to store ID of selected video
    // Function to handle the selection of a video
  const handleSelectVideo = (videoId) => {
    setSelectedVideo(videoId);// Update selectedVideo with the chosen video ID
  };
  

  return (
    <div>
      <h2>Movie Search Results</h2>
      {searchResults.length === 0 ? (//checks for search results
        <p>No results found.</p>
      ) : (
        <ul>
          {searchResults.map((result) => (//iterates through results, creates list
          //Each list item uses the video's ID as a unique key for React to track it.
            <li key={result.id.videoId}>
              <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
              <p>{result.snippet.title}</p>
              <button className="play-button" onClick={() => handleSelectVideo(result.id.videoId)}>Play</button>
            </li>
          ))}
        </ul>
      )}

      {/* checks if state variable has valid videoID before rendering video player */}
      {selectedVideo && (
        <div className="video-player">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
export default Movies;

