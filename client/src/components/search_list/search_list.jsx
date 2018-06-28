import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Image from 'react-image'
import "./searchlist.css";
import { ARROW_DOWN, ARROW_UP } from '../../img/index';


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




}

this.toggleSearchDiv = this.toggleSearchDiv.bind(this)
this.handleCheckBox = this.handleCheckBox.bind(this)
}


toggleSearchDiv(){
  if(this.state.searchDivVisible === 'search-list-filters-off'){
    this.setState({searchDivVisible:'search-list-filters-on'})
  }else{
      this.setState({searchDivVisible:'search-list-filters-off'})
  }
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

  // if(this.state.car === false){
  //   this.setState({fullSize:false,
  //                   compact:false  })
  // }else if (this.state.car === true){
  //   this.setState({fullSize:true,
  //                   compact:true})
  // }

}

render(){

  return(<div>



          <div className={this.state.searchDivVisible}>
            <div>
              <div><span>Search</span><input type='text'/></div><div></div>
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
