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