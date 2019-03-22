import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <form>
        <input type="text" name="search_box" placeholder="Search" />
        <button type="button">Go</button>
      </form>
    );
  }
}

export default Search;
