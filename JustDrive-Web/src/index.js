import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const domNode = document.getElementById('map'); 
const root = createRoot(domNode); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);