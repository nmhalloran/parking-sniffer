import React from "react";
import { Link } from 'react-router-dom';
const SpotIndexItem = (props) => {


  let recipeItemBgImgStyle = {
    // backgroundImage: "url(" + recipe.main_picture_url  + ")",
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

return(
<Link className="" to={`/spots/${props.spot._id}`}>
  <div className=""  >
    <div className="recipe-item-img" style={ recipeItemBgImgStyle }>
      {props.spot.city}

    </div>
  </div>
</Link>
)

}





export default SpotIndexItem
