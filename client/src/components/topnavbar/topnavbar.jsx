import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Image from "react-image";
import { ARROW_DOWN } from "../../img/index";
import { LOGO } from "../../img/index";

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const demoUser = {
      email: "superdad@gmail.com",
      password: "123456"
    };
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.clearErrors();
    this.props.loginUser(userData);
    this.props.loginDemo();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {}
  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {

    let currLocation = this.props.location.pathname

    return (
      <div>
        <div className="top-nav-bar">
          <div className="top-nav-bar-logo">
            <Link className="logo-link" to={"/user/profile"}>
              {" "}
              <Image className="top-nav-bar-logo-img" src={LOGO} />
              <span>Parking Sniffer</span>
            </Link>
          </div>

          <div className="top-nav-bar-info">
            {typeof this.props.currentUser.name === "undefined" ? (
              <div className="top-nav-bar-info-form">
                {(currLocation === '/search' || currLocation === '/') ? (null) : (<Link to={"/search"} className="top-nav-bar-search-logged">
                  Sniff parking spot
                </Link>)}
                <button className="top-nav-bar-login" onClick={() => this.props.loginDemo()}> Demo Login!</button>
                <Link className="top-nav-bar-login" to={"/signup"}>
                  {" "}
                  Sign Up
                </Link>
                <Link className="top-nav-bar-login" to={"/signin"}>
                  {" "}
                  Log In
                </Link>
              </div>
            ) : (
              <div className="top-nav-bar-info-logged">
                {(currLocation === '/search' || currLocation === '/') ? (null) : (<Link to={"/search"} className="top-nav-bar-search-logged">
                  Sniff parking spot
                </Link>)}

                <div>
                <Link to={'/user/profile'}>  <img src={this.props.currentUser.avatar} /></Link>
                </div>
                <div>
                <Link to={'/user/profile'}>  <span>{this.props.currentUser.name}</span></Link>
                </div>
                <div className="top-nav-bar-info-buttons">
                  &nbsp;<button
                    className="top-nav-bar-signout"
                    onClick={() => this.props.logoutUser()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="top-nav-bar-errors">
          {this.props.errors.map((err, idx) => <span key={idx}>{err}</span>)}
        </div>
      </div>
    );
  }
}

export default withRouter(TopNavBar);
