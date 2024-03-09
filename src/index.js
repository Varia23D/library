import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Pages/login-page';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/* <Login /> */}
  </React.StrictMode>
);
