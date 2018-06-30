import React from 'react';

import SignUpContainer from "./components/auth/signup_container";
import SignInContainer from "./components/auth/signin_container";
import TopNavBarContainer from "./components/topnavbar/topnavbar_container";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import CreateSpotContainer from "./components/spot/create_spot_container";
import EditSpotContainer from "./components/spot/edit_spot_container";
import ShowSpotContainer from "./components/spot/show_spot_container";
import SearchListContainer from "./components/search_list/search_list_container";
import ProfileContainer from "./components/profile/profile_container";
import {  Route,  Redirect,  Switch,  Link,  HashRouter} from 'react-router-dom';


// import { AuthRoute, ProtectedRoute } from '../util/route_util';



const App = () => (
  <div className="root-container">
    <Route path="/" component={TopNavBarContainer} />
<Switch>
    <Route exact path="/" component={SearchListContainer} />
    <Route exact path="/signup" component={SignUpContainer} />
    <Route exact path="/signin" component={SignInContainer} />
    <Route exact path="/spots/new" component={CreateSpotContainer} />
    <Route exact path="/spots/edit/:id" component={EditSpotContainer} />
    <Route exact path="/spots/:id" component={ShowSpotContainer} />
    <Route exact path="/user/profile" component={ProfileContainer} />

  </Switch>
      <Route path="/" component={Footer} />
  </div>
);

export default App;
