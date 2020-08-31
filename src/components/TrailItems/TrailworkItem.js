import React from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import './trailworkitem.scss';

const TrailworkItem = ({ trailItem }) => {
  let history = useHistory();
  return (
    <div className='trailworkitem-card col-md-7 card mt-3 mb-5 p-2'>
      <div className='card-body d-flex flex-column justify-content-center'>
        <h2 className='card-title center'>
          Trailhead: {trailItem.trailhead_entrance}
        </h2>
        <p className='card-text center'>
          The problem on this trail is the relatively steep incline of 38
          degrees. Plus there is a large boulder that has completely clocked the
          trail aout five miles in.
        </p>
        {trailItem.trailItemPhoto ? (
          <img
            className='card-img-top trailitem-card-image mx-auto'
            alt='No photo provided'
            src={trailItem.trailItemPhoto}
          />
        ) : (
          <p>No photo provided</p>
        )}
      </div>
      <table className='table table-hover'>
        <tbody className='w-100'>
          <tr>
            <th scope='row'>Date Found</th>
            <td>{trailItem.local_chapter}</td>
          </tr>
          <tr>
            <th scope='row'>Date Found</th>
            <td>{trailItem.date_found}</td>
          </tr>
          <tr>
            <th scope='row'>Reporting Person</th>
            <td>{trailItem.reporting_person}</td>
          </tr>
          <tr>
            <th scope='row'>GPS Location</th>
            <td>
              {trailItem.gps_latitude} {trailItem.gps_longitude}
            </td>
          </tr>
          <tr>
            <th scope='row'>Trail Head Entrance</th>
            <td>{trailItem.trailhead_entrance}</td>
          </tr>
          <tr>
            <th scope='row'>Distance from Trailhead</th>
            <td>{trailItem.distance}</td>
          </tr>
          <tr>
            <th scope='row'>Active/Complete</th>
            <td>{trailItem.trailItemStatus}</td>
          </tr>
          <tr>
            <th scope='row'>Date Resolved</th>
            <td>{trailItem.date_resolved}</td>
          </tr>
          <tr>
            <th scope='row'>Resolved by</th>
            <td>{trailItem.resolved_by}</td>
          </tr>
        </tbody>
      </table>
      <div className='card-body d-flex justify-content-between'>
        <EditButton
          className='card-link'
          trailId={trailItem.trailItemId}
          itemStatus={trailItem.trailItemStatus}
        />
        <button
          type='submit'
          className='btn btn-danger'
          onClick={() => {
            console.log('clicked cancel');
            history.push(`/tablelist/${trailItem.trailItemStatus}items`);
          }}
        >
          Back to List
        </button>
        <DeleteButton
          trailId={trailItem.trailItemId}
          itemStatus={trailItem.trailItemStatus}
          className='card-link'
        />
      </div>
    </div>
  );
};

export default withRouter(TrailworkItem);
