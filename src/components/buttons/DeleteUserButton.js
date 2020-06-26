import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class DeleteUserButton extends Component {
  render() {
    return (
      <button
        type='button'
        className='btn'
        aria-label='delete'
        onClick={() => this.deleteItem(this.props.trailId)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    );
  }
}

export default DeleteUserButton;
