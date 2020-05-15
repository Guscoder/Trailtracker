import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { storageRef, database } from '../firebaseConfig';

class DeleteButton extends React.Component {
  deleteItem = (trailId) => {
    console.log('delete button working for: ' + trailId);
    console.log('delete button working for photo: ' + trailId);
    let photoRef = storageRef.child(`trailphotos/${trailId}`);
    let trailItemRef = database.ref('trailitems/' + trailId);
    trailItemRef.remove().then(function () {
      console.log('Remove succeeded.');
    });
    photoRef
      .delete()
      .then(function () {
        console.log('Photo removal succeeded.');
      })
      .catch(function (error) {
        console.log('Error removing photo!');
      });
    this.props.history.push('/trailworklist');
  };

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

export default withRouter(DeleteButton);
