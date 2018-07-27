import React from "react";
import { Link } from "react-router-dom";
const SpotMapItem = props => {
  let spotItemBgImgStyle = {
    backgroundImage: "url(" + props.spot.img_url + ")",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    // backgroundWidth: '100%',
    borderRadius: "10px",
    backgroundSize: '100%'

  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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

  return (
    <div className="spot-display-link">
    { props.$hover ? (<Link className="spot-display-link" to={`/spots/${props.spot._id}`}>
      <div className="spot-index-box">
        <div className="spot-item-img" style={spotItemBgImgStyle} />
        <div className="spot-display-city">
          <span>{props.spot.city}</span>
        </div>
        <div className="spot-display-rate">
          <span>$ {props.spot.rental_rate}</span>
          <span>{capitalizeFirstLetter(props.spot.rental_type)}</span>
        </div>
      </div>
    </Link>) : (<Link className="spot-display-link" to={`/spots/${props.spot._id}`}><div className="map-point"></div></Link>)}
  </div>
  );
};

export default SpotMapItem;
