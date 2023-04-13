import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="99687232621-40jefmlher54eajsnhjudhmjqdqvn14t.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);