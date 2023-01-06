import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import "./i18n"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
            <App />
        </Router>
    </Suspense>
);
