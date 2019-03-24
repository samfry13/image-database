import React, { Component } from "react";
import default_img from "../media/default_img.png";
import TagsList from "./TagsList";

class ItemDetailedView extends Component {
  state = {};
  render() {
    return (
      <div className="item_detailed_view">
        <h1 className="item_detailed_title">Costume Title</h1>
        <img className="item_detailed_img" src={default_img} alt="item" />
        <h2 className="item_detailed_year">Year: 2018-2019</h2>
        <TagsList />
        <p className="item_detailed_description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet
          egestas rutrum. Nam vel mattis ante. Suspendisse vitae neque at sapien
          venenatis consequat. Phasellus felis nunc, convallis id elit at,
          suscipit aliquam lorem.
        </p>
      </div>
    );
  }
}

export default ItemDetailedView;
