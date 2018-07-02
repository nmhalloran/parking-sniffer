import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Image from 'react-image'
import "./topnavbar.css";
import { ARROW_DOWN } from '../../img/index';
import { LOGO } from '../../img/index';



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
  e.preventDefault();
  const userData = {
    email: this.state.email,
    password: this.state.password
  };
  this.props.clearErrors();
  this.props.loginUser(userData);
}

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

componentDidMount(){

}
componentWillUnmount(){
  this.props.clearErrors();
}

render(){

  return(
    <div>
    <div className="top-nav-bar">
      <div className="top-nav-bar-logo">

      <Link className="logo-link" to={'/'}>  <Image className="top-nav-bar-logo-img" src={ LOGO } /><span>Parking Sniffer</span></Link>
      </div>
      <div className="top-nav-bar-links">
          {(this.props.history.location.pathname === '/search') ? (null) : (<Link to={'/search'} className='top-nav-bar-links-sniff'>Sniff parking spot</Link>) }

          {(this.props.history.location.pathname === '/spots/new' || this.props.history.location.pathname === '/signup') ?
            (null) : ( <Link to={'/spots/new'} className='top-nav-bar-links-rent'>Rent my own parking spot</Link>)}
      </div>
      <div className="top-nav-bar-info">

        {typeof this.props.currentUser.name === 'undefined' ? (
          <div className="top-nav-bar-info-form" >

          <form onSubmit={this.onSubmit}>

            <input className="top-nav-bar-input"
              type="text"
              placeholder="Email address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />

          <input className="top-nav-bar-input"
              type="text"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          <button type="submit" className="top-nav-bar-signout" >Sign in</button>
        </form>

          <Link className="generic-link-1" to={'/signup'}>  I don't have an account</Link>
        </div>
        ) : (
          <div className="top-nav-bar-info-logged" >
            <div><img src={this.props.currentUser.avatar}/></div>
            <div><span>{this.props.currentUser.name}</span></div>
            <div className="top-nav-bar-info-buttons">
              <button className="top-nav-bar-signout" onClick={()=> this.props.logoutUser()}>Sign out</button>
            </div>
          </div>
        ) }


    </div>
  </div>
    <div className="top-nav-bar-errors">

        {this.props.errors.map((err,idx)=>(<span key={idx}>{err}</span>))}

    </div>

  </div>
  )
}


}

export default withRouter(TopNavBar);
