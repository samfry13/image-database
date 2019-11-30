import React from "react";
import {withRouter} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class LandingPage extends React.Component {
  componentDidMount() {
    const {history} = this.props;
    history.push(ROUTES.HOME);
  }

  render() {
    return <div/>
  }
}

export default withRouter(LandingPage);