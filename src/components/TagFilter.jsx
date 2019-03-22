import React, { Component } from "react";

class TagFilter extends Component {
  state = {};
  render() {
    return (
      <form>
        <label for="tags_filter">Filter Tags:</label>
        <select>
          <option value="dress">Dress</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
        </select>
      </form>
    );
  }
}

export default TagFilter;
