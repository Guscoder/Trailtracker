import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './homepage.scss';
import VolunteerInputForm from './forms/VolunteerInputForm';

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        {this.props.currentUserRole === 'ADMIN' ||
        this.props.currentUserRole === 'SAWYER' ? (
          <img
            className='homepage-image'
            src={require('../assets/images/IMG_1223.JPG')}
            alt='forest view'
          />
        ) : (
          ''
        )}
        {this.props.currentUserRole === 'MAINTAINER' ? (
          <VolunteerInputForm />
        ) : (
          ''
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
