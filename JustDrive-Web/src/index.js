import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('map'); 
const root = createRoot(domNode); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);