import React from 'react';

import SignUpContainer from "./components/auth/signup_container";
import SignInContainer from "./components/auth/signin_container";
import TopNavBarContainer from "./components/topnavbar/topnavbar_container";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import CreateSpotContainer from "./components/spot/create_spot_container";

import {  Route,  Redirect,  Switch,  Link,  HashRouter} from 'react-router-dom';


// import { AuthRoute, ProtectedRoute } from '../util/route_util';



const App = () => (
  <div className="root-container">
    <TopNavBarContainer />
    <Route exact path="/signup" component={SignUpContainer} />
    <Route exact path="/signin" component={SignInContainer} />

    <Route exact path="/" component={Footer} />

  </div>
);

export default App;
