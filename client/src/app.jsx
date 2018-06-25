import React from 'react';


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


// import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="root-container">
    <Landing />
    <Footer />
  </div>
);

export default App;
