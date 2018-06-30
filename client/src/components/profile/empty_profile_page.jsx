import React from "react";
import { Link } from "react-router-dom";

class EmptyProfilePage extends React.Component {
  render() {
    return (
      <div>
        <div>
          Your profile is currently empty. Please add some information to fully
          activate your account
        </div>
      </div>
    );
  }
}

export default EmptyProfilePage;
