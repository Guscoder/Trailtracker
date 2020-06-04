import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { storageRef, database } from '../../services/firebaseConfig';

class DeleteButton extends React.Component {
  deleteItem = (trailId) => {
    console.log('delete button working for: ' + trailId);

    const itemStatus = this.props.itemStatus;

    console.log('delete button category: ' + itemStatus);

    const photoRef = storageRef.child(`trailphotos/${trailId}`);

    database
      .ref(`/${itemStatus}items/` + trailId)
      .remove()
      .then(function () {
        console.log('Remove active succeeded.');
      });

    // switch (itemStatus) {
    //   case 'active':
    //     let activeItemRef = database.ref(`/${itemStatus}items/` + trailId);
    //     activeItemRef.remove().then(function () {
    //       console.log('Remove active succeeded.');
    //     });
    //     break;
    //   case 'completed':
    //     let completedItemRef = database.ref(`/${itemStatus}items/` + trailId);
    //     completedItemRef.remove().then(function () {
    //       console.log('Remove completed succeeded.');
    //     });
    //     break;
    //   default:
    //     let submittedItemRef = database.ref(`/${itemStatus}items/` + trailId);
    //     submittedItemRef.remove().then(function () {
    //       console.log('Remove submission succeeded.');
    //     });
    //     break;
    // }

    photoRef
      .delete()
      .then(function () {
        console.log('Photo removal succeeded.');
      })
      .catch(function (error) {
        console.log('Error removing photo!');
      });
    this.props.history.push(`trailworklist/${itemStatus}items`);
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
