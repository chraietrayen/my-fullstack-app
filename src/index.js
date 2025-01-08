import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
