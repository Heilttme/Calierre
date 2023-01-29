import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { HashRouter as Router } from "react-router-dom"
import "./i18n"
import { YMaps } from '@pbe/react-yandex-maps';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
            <App />
        </Router>
    </Suspense>
);
