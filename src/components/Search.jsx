import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <div className="search">
        <input type="text" className="search_box" placeholder="Search" />
        <button type="button">Go</button>
      </div>
    );
  }
}

export default Search;
