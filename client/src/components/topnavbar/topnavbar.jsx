import React from 'react';
import { Link } from 'react-router-dom';
import "./topnavbar.css";

class TopNavBar extends React.Component{

constructor(props){
  super(props)
  this.state = {
    email: '',
    password: '',
    errors: {}
  };

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

}

onSubmit(e) {
  debugger
  e.preventDefault();
  const userData = {
    email: this.state.email,
    password: this.state.password
  };
  this.props.loginUser(userData);
}

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

componentDidMount(){

}

render(){
      const { errors } = this.props.errors;

console.log(this.props.currentUser.avatar)
  return(
    <div>
    <div className="top-nav-bar">
      <div className="top-nav-bar-logo">
      </div>
      <div className="top-nav-bar-links">
      </div>
      <div className="top-nav-bar-info">
        {typeof this.props.currentUser.name === 'undefined' ? (
          <form onSubmit={this.onSubmit}>
            <input type="text"
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />

          <input type="text"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        ) : (
          <div>
            <img src={this.props.currentUser.avatar}/>
            <span>{this.props.currentUser.name}</span>
            <div className="top-nav-bar-info-buttons">
              <button className="top-nav-bar-signout" onClick={()=> this.props.logoutUser()}>Sign out</button>
            </div>
          </div>
        ) }


    </div>
    </div>
    <div className="top-nav-bar-toggle">
    </div>
    <div className="top-nav-bar-errors">
    </div>

  </div>
  )
}


}

export default TopNavBar;
