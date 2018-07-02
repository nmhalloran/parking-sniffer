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
      <div style={style}>
        <h3>&nbsp;&nbsp;&nbsp;Sign In</h3>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <input
            type="text"
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
        <Link className="generic-link-1" to={"/signup"}>
          {" "}
          I don't have an account
        </Link>
      </div>
    );
  }
}

export default withRouter(SignIn);
