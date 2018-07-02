import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //col-md-8 m-auto
    const { errors } = this.state;

    let style = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto"
    };

    return (
      <div>
        <h2 id="title-spot">Sign In</h2>
          <div className="showSignUp">
            <div className="showSignUp-Info">
              <div className="signUp-Info">
                <form onSubmit={this.onSubmit}>
                  <div className="input-text">
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  </div>
                  <div className="input-text">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  </div>
                  <div className="input-text">
                  <input
                    type="submit"
                    className="button"
                    value="Log In"
                  />
                </div>
                </form>
              <Link className="generic-link-1" to={"/signup"}>
                {" "}
                I don't have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
