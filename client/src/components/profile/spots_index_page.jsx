import React from "react";
import { Link } from "react-router-dom";

class SpotsIndexPage extends React.Component {
  render() {
    return (
      <div>
        <div className="profile-section-container">
          Spots for days. you have {this.props.spots.length} spots!
        </div>
      </div>
    );
  }
}

export default SpotsIndexPage;
