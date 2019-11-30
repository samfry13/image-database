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
        <Route path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.LOGIN} component={LoginPage}/>
        <Route path={ROUTES.HOME} component={HomePage}/>
    </Router>
);

export default withAuthentication(App);
