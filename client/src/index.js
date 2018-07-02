import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./root.jsx";
import configureStore from "./store";
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// registerServiceWorker();
