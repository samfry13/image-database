import React, { Component } from "react";
import default_image from "../media/default_image.png";

class Item extends Component {
  state = {};
  render() {
    return (
      <div class="Item">
        <img src={default_image} alt="costume" />
        <h3>Costume Title</h3>
        <h4>2019</h4>
      </div>
    );
  }
}

export default Item;
