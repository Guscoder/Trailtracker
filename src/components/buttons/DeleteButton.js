import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { storageRef, database } from '../../services/firebaseConfig';

class DeleteButton extends React.Component {
  deleteItem = (trailId, trailPhotoId, itemStatus) => {
    this.props.updateTrailItem(itemStatus);

    if (trailPhotoId) {
      const photoRef = storageRef.child(`trailphotos/${trailId}`);
      photoRef
        .delete()
        .then(function () {
          console.log('Photo removal succeeded.');
        })
        .catch(function (error) {
          alert('Error removing photo!');
          console.log('Error removing photo!');
        });
    }

    database
      .ref(`/${itemStatus}items/` + trailId)
      .remove()
      .then(function () {
        console.log('Remove active succeeded.');
      })
      .then(() => {
        alert('Item Deleted!');
      })
      .catch(function (error) {
        alert('Error removing item!');
      });
    this.props.history.push(`/tablelist/${itemStatus}items`);
  };

  render() {
    const { trailId, trailPhotoId, itemStatus } = this.props;

    return (
      <button
        type='button'
        className='btn'
        aria-label='delete'
        onClick={() => this.deleteItem(trailId, trailPhotoId, itemStatus)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(withRouter(DeleteButton));
