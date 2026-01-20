import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PopupApp from './PopupApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Detect if we're in extension popup context (small viewport)
const isExtensionPopup = window.innerWidth < 800;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {isExtensionPopup ? <PopupApp /> : <App />}
  </React.StrictMode>
);