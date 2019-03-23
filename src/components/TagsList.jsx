import React, { Component } from "react";
import Tag from "./Tag";

class TagsList extends Component {
  state = {};
  render() {
    return (
      <div className="tags_list">
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </div>
    );
  }
}

export default TagsList;
