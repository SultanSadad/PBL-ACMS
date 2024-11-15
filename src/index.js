import React from "react"; // Use double quotes consistently
import ReactDOM from "react-dom"; // Use double quotes consistently
import './index.css'; // Fix the import path for CSS (remove leading underscore)
import App from './App'; // Correct the import statement to use lowercase 'from' and consistent quotes
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Create a root element to render the application
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot for React 18+

// Render the application inside the root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
