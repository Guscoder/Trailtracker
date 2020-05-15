import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, withRouter } from 'react-router-dom';
import OptionsButton from './OptionsButton';
import './additembutton.css';

class OptionsPanel extends React.Component {
  handleSubmit = () => {};

  handleOpenItemsSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/trailworkList`);
  };

  render() {
    return (
      <div className='container w-100'>
        <div className='row d-flex justify-content-around'>
          <div className='col d-flex p-3 '>
            <Link to='/trailinputform' className='nolink'>
              <OptionsButton buttonText={'Add Item'} />
            </Link>
          </div>
          <div className='col d-flex p-3'>
            <Link to='/trailinputform' className='nolink'>
              <OptionsButton buttonText={'View Submissions'} />
            </Link>
          </div>
          <div className='col d-flex p-3 '>
            <Link to='/trailworkList' className='btn-block'>
              <OptionsButton buttonText={'Active Items'} />
            </Link>
          </div>
          <div className='col d-flex p-3 '>
            <OptionsButton buttonText={'Completed Items'} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    localGroup: state.localGroup,
  };
};

export default connect(mapStateToProps, actions)(withRouter(OptionsPanel));
