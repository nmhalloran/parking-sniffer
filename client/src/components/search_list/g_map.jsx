import React from "react";
import SpotMapItem from "./spot_map_item";
import GoogleMapReact from 'google-map-react';

class gMap extends React.Component{
constructor(props){
  super(props)
}

render(){
  return(
    <GoogleMapReact
       bootstrapURLKeys={{ key:'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg' }}
       defaultCenter={this.props.defaultCenter}
       defaultZoom={this.props.defaultZoom}
     >

     {this.props.listingsOnMain.map((spot, idx) => (
       <SpotMapItem key={idx} spot={spot}  lat={spot.geometry.coordinates[1]}
        lng={spot.geometry.coordinates[0]} text={'Test'}/>
     ))}

     </GoogleMapReact>
  )
}


}



export default gMap;
