import React, { Component } from "react";
import default_image from "../media/default_image.png";

class Item extends Component {
  state = {};
  render() {
    return (
      <div className="item">
        <img
          className="item_img"
          src={default_image}
          alt="costume"
          width="600px"
          height="600px"
        />
        <div className="item_description">
          <h3 className="item_title">Costume Title</h3>
          <h4 className="item_year">2019</h4>
        </div>
      </div>
    );
  }
}

export default Item;
