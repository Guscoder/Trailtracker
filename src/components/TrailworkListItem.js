import React from 'react';
import ViewButton from './ViewButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const TrailworkListItem = ({ trailItem }) => {
  return (
    <React.Fragment>
      <tr>
        <td>{trailItem.date_found}</td>
        <td>{trailItem.reporting_person}</td>
        <td>{trailItem.trailhead_entrance}</td>
        <td>{trailItem.local_chapter}</td>

        <td>
          <ViewButton trailId={trailItem.trailItemId} />
        </td>
        <td>
          <EditButton trailId={trailItem.trailItemId} />
        </td>
        <td>
          <DeleteButton
            trailId={trailItem.trailItemId}
            trailPhotoId={trailItem.trailPhotoId}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TrailworkListItem;
