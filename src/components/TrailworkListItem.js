import React from 'react';
import ViewButton from './buttons/ViewButton';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';

const TrailworkListItem = ({ trailItem }) => {
  console.log(trailItem.trailItemStatus);
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
          <EditButton
            trailId={trailItem.trailItemId}
            itemStatus={trailItem.trailItemStatus}
          />
        </td>
        <td>
          <DeleteButton
            trailId={trailItem.trailItemId}
            trailPhotoId={trailItem.trailPhotoId}
            itemStatus={trailItem.trailItemStatus}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TrailworkListItem;
