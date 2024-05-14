import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const domNode = document.getElementById('root'); 
if (domNode) {
    const root = createRoot(domNode);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}