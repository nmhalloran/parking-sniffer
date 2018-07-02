import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import './auth.css';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.createUser(newUser, this.props.history);
  }

  render() {
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
        <h2 id="title-spot">Create your account</h2>
          <div className="showSignUp">
            <div className="showSignUp-Info">
              <div className="signUp-Info">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-text">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  </div>
                  <div className="input-text">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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
                    type="text"
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  </div>
                  <div>
                  <input
                    type="submit"
                    className="button"
                    value="Sign Up"
                  />
                 </div>
                </form>
                <Link className="generic-link-1" to={"/signin"}>
                  {" "}
                  I already have an account
                </Link>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
