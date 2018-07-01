import React from "react";
import SpotsIndexItem from "./spots_index_item";
import { Link } from "react-router-dom";

class SpotsIndexPage extends React.Component {
  render() {
    let spots = this.props.spots.map((spot, i) => {
      return (
        <SpotsIndexItem
          key={spot._id}
          spot={spot}
        />
      );
    });
    return spots;
  }
}

export default SpotsIndexPage;
