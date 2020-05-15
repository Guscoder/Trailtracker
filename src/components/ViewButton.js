import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class ViewButton extends React.Component {
  viewItem = () => {
    console.log('view button working');
    console.log(this.props.trailId);

    this.props.viewTrailItemId(this.props.trailId);
    this.props.history.push(`/TrailworkItem`);
  };

  render() {
    return (
      <button
        type='button'
        className='btn'
        aria-label='view'
        onClick={() => this.viewItem()}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(withRouter(ViewButton));
