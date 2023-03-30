import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { CreateAuth } from "Hooks/useAuth/use_auth";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CreateAuth>
      <App />
    </CreateAuth>
  </React.StrictMode>
);