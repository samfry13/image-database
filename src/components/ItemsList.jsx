import React, { Component } from "react";
import Item from "./Item";

class ItemsList extends Component {
  state = {};
  render() {
    return (
      <div className="items_list">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    );
  }
}

export default ItemsList;
