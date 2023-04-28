import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="99687232621-40jefmlher54eajsnhjudhmjqdqvn14t.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>

  </GoogleOAuthProvider>
);