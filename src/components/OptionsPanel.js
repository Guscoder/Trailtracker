import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import OptionsButton from './buttons/OptionsButton';
import './optionspanel.scss';

class OptionsPanel extends React.Component {
  render() {
    return (
      <div className='d-flex optionspanel align-items-center justify-content-around'>
        <div className='row'>
          <div className='col-md-6 col-lg-3 d-flex justify-content-center'>
            <Link to='/trailinputform'>
              <OptionsButton buttonText={'Add Item'} />
            </Link>
          </div>
          <div className='d-flex col-md-6 col-lg-3 justify-content-center'>
            <Link to='/trailworkList/submitteditems'>
              <OptionsButton buttonText={'View Submissions'} />
            </Link>
          </div>
          <div className='d-flex col-md-6 col-lg-3 justify-content-center'>
            <Link to='/trailworkList/activeitems'>
              <OptionsButton buttonText={'Active Items'} />
            </Link>
          </div>
          <div className='d-flex col-md-6 col-lg-3 justify-content-center'>
            <Link to='/trailworkList/completeditems'>
              <OptionsButton buttonText={'Completed Items'} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OptionsPanel);
