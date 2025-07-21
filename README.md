This branch introduces the Cart component for the Streamlist app, handling user-selected streaming and streamlist subscription plans. It includes:

State Management: Utilizes React’s useState to track selected plans, total price, sales tax, and payment information.

Plan Selection:
Streaming and Streamlist plans are displayed with radio buttons for exclusive selection.
Streaming plans are hardcoded in the component, while Streamlist plans are imported from an external data file for scalability.
Selection handlers (handleStreamPlanSelection and handleStreamlistPlanSelect) update the state and total cost in real-time.

Storage Control: Includes a handleClearSelection function that resets state values and clears local storage, allowing users to restart their selections.

UI and Layout: Implements a clear, categorized layout with labels for each plan type.
Uses CSS Flexbox for responsive design, ensuring consistent layout across different screen sizes.
Maintains uniform styling and spacing for inputs and buttons, using relative units (percentages, viewport widths) for mobile responsiveness.

Validation: Prevents checkout if required fields (e.g., payment info) are incomplete.

Maintainability: Separates plan data from component logic to simplify updates and extensions.

This branch focuses on delivering a responsive, interactive, and maintainable cart system with a clean user interface and well-organized state and data flow

Edit, Delete, and Video Selection Features

This branch enhances the Streamlist app with functionality for editing and deleting list items, and adds video selection capabilities through YouTube API integration.

Streamlist Component Updates:
	State Variables:
		inputList: Stores an array of movies, each with a unique ID (uuidv4).
		editText: Temporarily holds the text being edited.
		editID: Tracks which movie is being edited.
		message: Displays feedback for actions like adding, editing, or removing items.
	Editing Workflow:
		handleEdit loads selected movie text into editText and sets editID.
		The edit form appears conditionally based on editID.
		handleEditSubmit replaces the movie's text in inputList based on editID.
		handleEditCancel resets editText and editID, hiding the edit form.
		Delete Functionality: A remove button deletes a selected movie and updates the UI immediately.

Movies Component Updates:
	Navigation and State Transfer: 
		Uses useNavigate to pass YouTube search results as state when navigating to the Movies page.
		useLocation retrieves this state to render video options.
		Includes fallback logic to prevent errors if no state is passed.

Video Selection:
	selectedVideo state tracks the chosen video ID.
	handleSelectVideo(videoID) updates the state when a user selects a video.
	Enables the app to load the appropriate video trailer.

These updates improve interactivity in the app by allowing users to manage their movie list more dynamically and preview video content with future support for full playback after subscription.