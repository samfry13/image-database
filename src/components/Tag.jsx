import React, { Component } from "react";
import tag_logo from "../media/tag.png";

class Tag extends Component {
  state = {};
  render() {
    return (
      <div className="tag">
        <img className="tag_img" src={tag_logo} alt="tag" />
        <p>Tag Name</p>
      </div>
    );
  }
}

export default Tag;
