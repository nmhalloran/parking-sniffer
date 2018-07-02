import React from "react";
import { Link } from "react-router-dom";
import Image from "react-image";
import { PARKING2 } from "../../img/index";
import { LANDINGLADY } from "../../img/index";

const landingPage = props => {
  let landingFirstImage = {
    backgroundImage: "url(" + LANDINGLADY + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  };

  return (
    <div className="landing-main-container">
      <div className="landing-first-image" style={landingFirstImage}>
        <div className="landing-page-greeting">
          <span>
            {" "}
            Parking Sniffer is peer-to-peer website that allows you to search
            and reserve private parking spots across the US.
          </span>
        </div>
        <div className="landing-page-buttons">
          <Link className="" to={`/search`}>
            <button className="landing-button">Search</button>
          </Link>
          <Link className="" to={`/signup`}>
            <button className="landing-button">Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="landing-slogan">
        <span> Sniffing private parking spots across US since 2018</span>
      </div>
    </div>
  );
};

export default landingPage;
