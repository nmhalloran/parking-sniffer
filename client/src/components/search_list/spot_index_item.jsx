import React from "react";
import { Link } from "react-router-dom";
const SpotIndexItem = props => {
  let spotItemBgImgStyle = {
    backgroundImage: "url(" + props.spot.img_url + ")"
  };
  //Structure
  // city:"SanFrancisco"
  // description:"spot in sanfrancisco"
  // geometry:{type: "Point", coordinates: Array(2)}
  // img_url:"abcd"
  // line1:"825 battery street"
  // line2:"..."
  // rental_rate:20
  // rental_type:"daily"
  // spot_type:"covered"
  // state:"CA"
  // vehicle_types:[]
  // zipcode:94105
  // _id:"5b36d9aa8ec33babea85fb4e"
  debugger;
  return (
    <Link className="" to={`/spots/${props.spot._id}`}>
      <div className="spot-index-box">
        <div className="recipe-item-img" style={spotItemBgImgStyle}>
          {props.spot.city}
          {props.spot.rental_rate}
          {props.spot.rental_type}
          {props.spot.city}
          {props.spot.state}
        </div>
      </div>
    </Link>
  );
};

export default SpotIndexItem;
