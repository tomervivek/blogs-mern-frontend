import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SavedBlogProvider } from './SavedBlogContext';
import App from './App';

ReactDOM.render(
  <SavedBlogProvider>
    <App />
  </SavedBlogProvider>,
  document.getElementById('root')
);
