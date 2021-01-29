import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./homepage.scss";
import VolunteerInputForm from "./forms/VolunteerInputForm";

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        {this.props.currentUserRole === "ADMIN" ||
        this.props.currentUserRole === "SAWYER" ? (
          <div>
            <div class='trail-link-div'>
              <a
                className='trail-link link-one p-2'
                href='https://northcountrytrail.org/the-trail/trail-map-and-downloads/'
                target='_blank'
                rel='noopener noreferrer'
              >
                NCT Interactive Map
              </a>
            </div>
            <div class='trail-link-div'>
              <a
                className='trail-link link-two p-2'
                href='https://www.fs.fed.us/ivm/index.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                National Forest Service Map
              </a>
            </div>
            <img
              className='homepage-image'
              src={require("../assets/images/IMG_1223.JPG")}
              alt='forest view'
            />
          </div>
        ) : (
          ""
        )}
        {this.props.currentUserRole === "MAINTAINER" ? (
          <VolunteerInputForm />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUserRole: state.auth.currentUserRole,
  };
}

export default connect(mapStateToProps)(withRouter(HomePage));
