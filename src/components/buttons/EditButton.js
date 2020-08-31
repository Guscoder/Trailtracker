import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class EditButton extends React.Component {
  editItem = () => {
    console.log('edit button working');
    console.log(this.props);

    console.log(this.props.trailId);
    console.log(this.props.itemStatus);
    this.props.viewTrailItemId(this.props.trailId);

    this.props.updateTrailItem(this.props.itemStatus);
    this.props.history.push(`/EditableTrailItem`);
  };

  render() {
    return (
      <button
        type='button'
        className='btn'
        aria-label='edit'
        onClick={() => this.editItem()}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
    trailItemId: state.trailItemId.trailItemId,
  };
};

export default connect(mapStateToProps, actions)(withRouter(EditButton));
