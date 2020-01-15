import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/common/header.js';
import App from './App.js';
import Footer from './components/common/footer.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/common/layout.css';
import ls from 'local-storage';

ReactDOM.render(<Header isLogged={ls('user-token')} />, document.getElementById('header'));
ReactDOM.render(<App isLogged={ls('user-token')} />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
