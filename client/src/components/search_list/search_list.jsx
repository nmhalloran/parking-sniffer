import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Image from 'react-image'
import "./searchlist.css";
import { ARROW_DOWN } from '../../img/index';


class SearchList extends React.Component{

constructor(props){
  super(props)
this.state = {
  searchDivVisible: 'search-list-filters-off',
}

this.toggleSearchDiv = this.toggleSearchDiv.bind(this)
}


toggleSearchDiv(){
  if(this.searchDivVisible === 'search-list-filters-off'){
    this.setState({searchDivVisible:'search-list-filters-on'})
  }else{
      this.setState({searchDivVisible:'search-list-filters-off'})
  }
}


render(){


console.log(this.state)
  return(<div>

          <div className={this.searchDivVisible}>
test
          </div>

          <div onClick={()=>this.toggleSearchDiv()} className="search-list-toggle">
           <Image className="search-list-arrow" src={ ARROW_DOWN } />
           <span>Apply filters</span>
            <Image className="search-list-arrow" src={ ARROW_DOWN } />
          </div>


        </div>)
}


}

export default withRouter(SearchList);
