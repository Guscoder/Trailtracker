import React, { Component } from "react";
import nctsign from "../images/NCTsign.jpeg";

const imageStyle = {
  width: "100vw",
  height: "auto"
};

export default class Home extends Component {
  render() {
    return (
      <div>
        <img
          className="img-fluid"
          src={nctsign}
          style={imageStyle}
          alt="NCT trail map"
        />
      </div>
    );
  }
}
