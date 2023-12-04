import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import "./i18n"
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000"
// axios.defaults.baseURL = "https://api.calierre.ru"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div>CALIERRE</div>}>
        <Router>
            <App />
        </Router>
    </Suspense>
);
