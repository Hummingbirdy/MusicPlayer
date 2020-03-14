import '../CSS/site.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.render(
    <Router>
        <Route component={App} />
    </Router>,
    document.getElementById('app')
);
