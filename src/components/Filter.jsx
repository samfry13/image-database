import React, { Component } from "react";
import TagFilter from "./TagFilter";
import Search from "./Search";
import TagsList from "./TagsList";

class Filter extends Component {
  state = {};
  render() {
    return (
      <div className="filter">
        <div className="filter_input">
          <TagFilter />
          <Search />
        </div>
        <TagsList />
      </div>
    );
  }
}

export default Filter;
