User Event Handling and State Management

This branch adds functionality to handle user input and events for managing a movie stream list. Key features include:

State Management: Uses React’s useState to track input field values and the list of submitted movies.

Event Handling:
handleInputChange: Updates input state as the user types.
handleSubmit: Adds non-empty movie titles to the list and clears the input field.
handleRemove: Removes a movie from the list by index.

Dialog Control: Implements state-based dialog boxes to prompt users to log in or subscribe before accessing restricted features.

Routing: Uses useNavigate from React Router to navigate to pages like the cart or movie list when actions are triggered.

Security Enforcement: Ensures that only authenticated users can access protected views or actions like saving a list.

This branch focuses on improving interactivity, stateful UI behavior, and basic user access control within the stream list application.