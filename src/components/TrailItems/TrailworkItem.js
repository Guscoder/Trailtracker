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
        <h2 className='card-title text-center'>Trailhead: </h2>
        <p className='card-text text-center'>{trailItem.trailhead_entrance}</p>
        <h4 className='card-title text-center'>Description: </h4>
        <p className='card-text text-center'>{trailItem.description}</p>
        {trailItem.trailItemPhoto ? (
          <img
            className='card-img-top trailitem-card-image mx-auto'
            alt='None provided'
            src={trailItem.trailItemPhoto}
          />
        ) : (
          <p>No photo provided</p>
        )}
      </div>
      <table className='table table-hover'>
        <tbody className='w-100'>
          <tr>
            <th scope='row'>NCT Chapter</th>
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
              {trailItem.gps_latitude}, {trailItem.gps_longitude}
            </td>
          </tr>
          <tr>
            <th scope='row'>Mile Marker</th>
            <td>{trailItem.mile_marker}</td>
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
