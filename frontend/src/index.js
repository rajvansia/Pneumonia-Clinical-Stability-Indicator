import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from "./Components/NavBar.js"
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
const store = configureStore()

ReactDOM.render( <Provider store={store}>
 <App />
 </Provider>, document.getElementById('root'));
registerServiceWorker();
