import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root.jsx';
import configureStore from './store';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={configureStore()} />, document.getElementById('root'));
// registerServiceWorker();
