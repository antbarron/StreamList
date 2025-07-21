Management requests the ability for users to search and review movie information directly on another page. 

Local Storage Integration and Movie Reviews via API

This branch introduces persistent local storage functionality and integrates external API calls to fetch and display movie reviews within the Streamlist app.

Local Storage Features

	Persistence with localStorage: 
		On component mount, useEffect initializes inputList and savedList from localStorage.
		Changes to either list are serialized and saved back to localStorage via useEffect hooks.
		Edits, additions (handleSubmit), and deletions (handleRemove) are all synchronized with local storage.
		The handleEditSubmit and handleSaveList functions update movie entries and saved lists while maintaining consistency across sessions.

	Resilience:
		Updates are reflected instantly in the UI and persist across page refreshes, ensuring a reliable user experience.
		
Movie Reviews via API:

	handleMovieReviews Function:
	Fetches reviews from The Movie Database (TMDB) API using the movie title.
	Searches for a movie, retrieves its ID, and then fetches associated reviews.
	Uses React Router's navigate function to route to a movie page with title and reviews passed in state.
	Includes error handling for failed requests or unmatched titles.

Movies Component:
	Retrieves movie title and reviews using useLocation to access state from navigation.
	Displays each review (author and content) or a message if no reviews are found.

Additional Notes:

	The component structure ensures data persistence, real-time UI synchronization, and seamless API integration.
	These updates enhance the app by allowing users to manage custom movie lists while accessing external content and preserving data between sessions.