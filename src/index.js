import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SavedBlogProvider } from './SavedBlogContext';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.render(
  <SavedBlogProvider>
    <App />
  </SavedBlogProvider>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
