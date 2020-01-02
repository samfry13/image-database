import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from "../Session";

import Navigation from "../Navigation";
import LandingPage from "../LandingPage";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";

const mql = window.matchMedia(`(min-width: 950px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: mql.matches, sidebarOpen: false});
  }

  render() {
    const {sidebarOpen, sidebarDocked} = this.state;

    return <Router>
      <Navigation />
      {/* This div is because the nav bar is an absolute position, so it's like it's not even there, meaning
          the pictures and login form will slide underneath it*/}
      <div style={{height: "75px", width: "100%"}}/>
      <Route path={ROUTES.LANDING} component={LandingPage}/>
      <Route path={ROUTES.LOGIN} component={LoginPage}/>
      <Route path={ROUTES.HOME} component={(props) => <HomePage sidebarOpen={sidebarOpen}
                                                     sidebarDocked={sidebarDocked}
                                                     onSetOpen={this.onSetSidebarOpen} {...props}/>}/>
    </Router>
  }
}

export default withAuthentication(App);
