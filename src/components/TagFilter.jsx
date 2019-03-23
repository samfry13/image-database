import React, { Component } from "react";

class TagFilter extends Component {
  state = {};
  render() {
    return (
      <div className="tags_filter">
        <select className="tags_filter_select">
          <option value="dress">Dress</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
        </select>
        <button type="button" className="tags_filter_add_button">
          Add Tag
        </button>
      </div>
    );
  }
}

export default TagFilter;
