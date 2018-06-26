import React from 'react';
import { Link } from 'react-router-dom';


class TopNavBar extends React.Component{

constructor(props){
  super(props)



}

componentDidMount(){

}

render(){

  return(
    <div>
      <input type='button' onClick={()=> this.props.logoutUser()} value="Test"/>
    </div>
  )
}


}

export default TopNavBar;
