import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import OptionsButton from './buttons/OptionsButton';
import './optionspanel.scss';
import AdminMenu from './AdminMenu';

class OptionsPanel extends React.Component {
  render() {
    return (
      <>
        {/* <AdminMenu /> */}
        <div className='d-flex optionspanel align-items-center justify-content-around'></div>
      </>
    );
  }
}

export default withRouter(OptionsPanel);
