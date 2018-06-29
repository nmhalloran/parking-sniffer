import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Image from 'react-image'
import "./searchlist.css";
import { ARROW_DOWN, ARROW_UP } from '../../img/index';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class SearchList extends React.Component{

constructor(props){
  super(props)


this.state = {
  searchDivVisible: 'search-list-filters-off',
  garage:false,
  openParking: true,
  underground: false,
  solar: false,

  daily:true,
  weekly:false,
  monthly: false,

  motorcycle:false,
  truck:false,
  car:true,
  fullSize: true,
  compact: true,
  other: false,

  lat:'',
  long: '',
  pos: 0,
  range: 5,
  zip:'20565',
  requestSuccessful: false,
}

this.toggleSearchDiv = this.toggleSearchDiv.bind(this)
this.handleCheckBox = this.handleCheckBox.bind(this)
this.handleField = this.handleField.bind(this)
}

componentDidMount(){
  navigator.geolocation.getCurrentPosition((pos)=>{
    this.setState({pos:pos})
    this.props.fetchSpotsByGPS({
      latitude:pos.coords.latitude,
      longitude:pos.coords.longitude,
      range: this.state.range,
    })
  },()=>{
    this.props.fetchSpotsByZip(this.state.zip)
})
}


componentWillReceiveProps(nextProps){
debugger
  console.log(nextProps)
}


toggleSearchDiv(){
  if(this.state.searchDivVisible === 'search-list-filters-off'){
    this.setState({searchDivVisible:'search-list-filters-on'})
  }else{
      this.setState({searchDivVisible:'search-list-filters-off'})
  }
}


handleField(e, field){
  this.setState({[field]:e.target.value})
}

handleCheckBox(e){
  if(this.state[e]){
    if(e === 'car'){
      this.setState({fullSize:false,
                      compact:false,
                      [e]:false, })
    }else{
        this.setState({[e]:false})
    }

  }
  else{

    if(e === 'car'){
      this.setState({fullSize:true,
                      compact:true,
                      [e]:true, })
    }else if (e != 'compact' && e != 'fullSize'){
        this.setState({[e]:true})
    }else{
      if(this.state.car){
        this.setState({[e]:true})
      }
    }
  }
}

render(){
console.log(this.state)
  return(<div>



          <div className={this.state.searchDivVisible}>
            <div className="search-list-zip">
              <div ><span>Search</span><input onChange={(e)=>this.handleField(e,'range')} value={this.state.range} type='text'style={{width:'40px'}}/><span>miles</span></div><div><span>around</span><input onChange={(e)=>this.handleField(e,'zip')} value={this.state.zip}  type='text' style={{width:'60px'}} /></div>
            </div>

            <div className="search-list-checkbox-row">
              <div className="search-list-checkbox"><span>Type</span></div>
              <div className="search-list-checkbox"><span>Term</span></div>
              <div className="search-list-checkbox"><span>Vehicle</span></div>
            </div>


            <div className="search-list-checkbox-row">
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("garage")}  checked={!!this.state.garage}/><span>Garage</span></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("daily")}  checked={!!this.state.daily}/><span>Daily</span></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("motorcycle")}  checked={!!this.state.motorcycle}/><span>Motorcycle</span></div>
            </div>

            <div className="search-list-checkbox-row">
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("openParking")}  checked={!!this.state.openParking}/><span>Open parking</span></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("weekly")}  checked={!!this.state.weekly}/><span>Weekly</span></div>
              <div className="search-list-checkbox" ><input type="checkbox" onChange={()=>this.handleCheckBox("car")}  checked={!!this.state.car} /><span>Car</span></div>
              <div className="search-list-checkbox" style={{marginLeft:'15px'}}><input type="checkbox" onChange={()=>this.handleCheckBox("fullSize")}  checked={!!this.state.fullSize}/><span>Full size</span></div>
              <div className="search-list-checkbox" style={{marginLeft:'15px'}}><input type="checkbox" onChange={()=>this.handleCheckBox("compact")}  checked={!!this.state.compact}/><span>Compact</span></div>
            </div>

            <div className="search-list-checkbox-row">
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("underground")}  checked={!!this.state.underground}/><span>Underground</span></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("monthly")}  checked={!!this.state.monthly}/><span>Monthly</span></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("truck")}  checked={!!this.state.truck}/><span>Truck</span></div>
            </div>

            <div className="search-list-checkbox-row">
              <div className="search-list-checkbox"> <input type="checkbox" onChange={()=>this.handleCheckBox("solar")}  checked={!!this.state.solar}/><span>Solar carport</span></div>
              <div className="search-list-checkbox"></div>
              <div className="search-list-checkbox"><input type="checkbox" onChange={()=>this.handleCheckBox("other")}  checked={!!this.state.other}/><span>Other</span></div>
            </div>


          </div>

          <div onClick={()=>this.toggleSearchDiv()} className="search-list-toggle">
            {this.state.searchDivVisible === 'search-list-filters-off' ? (
              <Image className="search-list-arrow" src={ ARROW_DOWN } />
            ) : (
              <Image className="search-list-arrow" src={ ARROW_UP } />
            )}
           <span>Apply filters</span>
           {this.state.searchDivVisible === 'search-list-filters-off' ? (
             <Image className="search-list-arrow" src={ ARROW_DOWN } />
           ) : (
             <Image className="search-list-arrow" src={ ARROW_UP } />
           )}
          </div>


        </div>)
}


}

export default withRouter(SearchList);
