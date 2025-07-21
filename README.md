Google OAuth Integration and PWA Setup

This branch introduces Google authentication and Progressive Web App (PWA) capabilities to the StreamList application.

Google OAuth Integration:
	
	OAuth Setup:
		Generated a Google OAuth Client ID via the Google Developer Console.
		Installed the @react-oauth/google package using npm install @react-oauth/google.

	Application Integration:
		Wrapped the root component in GoogleOAuthProvider (in App.js) and passed the Client ID to enable Google login throughout the app.
		Implemented the GoogleLogin button in Navbar.js to handle user authentication.
		On successful login, extracted the user’s token from response.credential and stored it in application state.
		Used useNavigate from react-router-dom to redirect users to the main page after login.
		Implemented logout by clearing the stored credentials and redirecting users to the login screen.

	Access Control:
		Ensures only authenticated users can access the core features of the app, maintaining session-based control.
	
Progressive Web App (PWA) Setup:

	Tooling:
		Installed PWABuilder CLI globally using npm install -g pwabuilder.

	PWA Configuration:
		Ran pwabuilder http://localhost:3001 to analyze the local app and generate required files.
		Addressed any flagged issues to meet PWA compliance standards.
		Added the generated manifest.json and service worker for offline support and installation capabilities.

	Deployment Benefits:
		Enabled installation of StreamList as a PWA on Chrome (macOS tested), allowing users to experience the app in a more native, app-like way directly from the browser.