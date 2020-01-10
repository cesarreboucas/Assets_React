import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header.js';
import App from './App.js';
import Footer from './components/header/footer.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/header/layout.css';


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
