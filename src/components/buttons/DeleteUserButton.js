import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../services/firebaseConfig';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions';

class DeleteUserButton extends Component {
  removeUser = () => {
    const { userEmail } = this.props;

    console.log(userEmail);
    console.log(this.props);
    database
      .ref(`/users/`)
      .orderByChild('email')
      .equalTo(userEmail)
      .once('value', function (snapshot) {
        let userKey = Object.keys(snapshot.val())[0];
        database
          .ref(`/users/${userKey}`)
          .remove()
          .then(function () {
            console.log('Remove user succeeded.');
            alert('User deleted!');
          });
      })
      .then(() => {
        this.props.deleteUser(userEmail);
      });
    this.props.history.push(`/users/userlist`);
  };

  render() {
    return (
      <button
        type='button'
        className='btn'
        aria-label='delete'
        onClick={() => this.removeUser()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    );
  }
}

const mapDispatchToProps = {
  deleteUser,
};

export default connect(null, mapDispatchToProps)(withRouter(DeleteUserButton));
