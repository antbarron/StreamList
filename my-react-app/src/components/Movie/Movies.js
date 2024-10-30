import React, { useState } from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

const Movies = () => {
    const location = useLocation();
    const { searchResults = [], reviews = [], movieTitle = "" } = location.state || {};

    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleSelectVideo = (videoId) => {
        setSelectedVideo(videoId);
    };
    const closeVideoPlayer = () => {
      setSelectedVideo(null); // Reset selected video to close the overlay
  };

    return (
        <div>
            <h2>Movie Search Results</h2>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
              <ul>
              {searchResults.map((result) => (
                  <li key={`${result.id.videoId}-${result.snippet.title}`}>
                      <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
                      <p>{result.snippet.title}</p>
                      <button className="play-button" onClick={() => handleSelectVideo(result.id.videoId)}>Play</button>
                  </li>
              ))}
          </ul>
          
            )}

            {selectedVideo && (
                              <div className="video-overlay">
                              <button className="close-button" onClick={closeVideoPlayer}>&times;</button>
          
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
                </div>
  )}

            <div>
                <h2>{movieTitle}</h2>
                <h3>Movie Reviews</h3>
                {reviews && reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <h4>{review.author}</h4>
                                <p>{review.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews available for this movie.</p>
                )}
            </div>
        </div>
    );
};

export default Movies;
