import React, { Component } from "react";
import ItemsList from "./ItemsList";

class Content extends Component {
  state = {};
  render() {
    return (
      <div className="content">
        <ItemsList />
      </div>
    );
  }
}

export default Content;
