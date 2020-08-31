import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class DeleteUserButton extends Component {
  deleteItem = () => {
    this.props.history.push();
  };
  render() {
    return (
      <button
        type='button'
        className='btn'
        aria-label='delete'
        onClick={() => this.deleteItem()}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  }
}

export default DeleteUserButton;
