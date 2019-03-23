import React, { Component } from "react";
import Login from "./Login";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <div className="spacer" />
        <h1 className="header_title">Database</h1>
        <Login />
      </div>
    );
  }
}

export default Header;
