import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from "../Session";

import Navigation from "../Navigation";
import LandingPage from "../LandingPage";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";

const App = () => (
    <Router>
      <Navigation/>
      {/* This div is because the nav bar is an absolute position, so it's like it's not even there, meaning
          the pictures and login form will slide underneath it*/}
      <div style={{height: "75px", width: "100%"}}/>
      <Route path={ROUTES.LANDING} component={LandingPage}/>
      <Route path={ROUTES.LOGIN} component={LoginPage}/>
      <Route path={ROUTES.HOME} component={HomePage}/>
    </Router>
);

export default withAuthentication(App);
