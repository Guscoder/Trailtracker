import React from 'react';
import { withRouter } from 'react-router-dom';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

const TrailworkItem = ({ trailItem }) => {
  return (
    <article className='w-100'>
      <div className='card col-md-6 offset-md-3  mt-3 p-2'>
        <img
          className='card-img-top img-fluid'
          alt='...'
          src={trailItem.trailItemPhoto}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            Trailhead: {trailItem.trailhead_entrance}
          </h5>
          <p className='card-text'>
            The problem on this trail is the relatively steep incline of 38
            degrees. Plus there is a large boulder that has completely clocked
            the trail aout five miles in.
          </p>
        </div>
        <table className='table table-hover'>
          <tbody className='w-100'>
            <tr>
              <th scope='row'>Date Found</th>
              <td>{trailItem.date_found}</td>
            </tr>
            <tr>
              <th scope='row'>Reporting Person</th>
              <td contentEditable>{trailItem.reporting_person}</td>
            </tr>
            <tr>
              <th scope='row'>GPS Location</th>
              <td></td>
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
          <EditButton className='card-link' trailId={trailItem.trailItemId} />
          <DeleteButton trailId={trailItem.trailItemId} className='card-link' />
        </div>
      </div>
    </article>
  );
};

export default withRouter(TrailworkItem);

// <img
//         className='card-img-top img-fluid'
//         alt='...'
//         src={this.props.trailItem.trailItemPhoto}
//       />
//       <div className='card-body'>
//         <h5 className='card-title'>
//           Trailhead: {this.props.trailItem.trailhead_entrance}
//         </h5>
//         <p className='card-text'>
//           The problem on this trail is the relatively steep incline of 38
//           degrees. Plus there is a large boulder that has completely clocked the
//           trail aout five miles in.
//         </p>
//       </div>
//       <table className='table table-responsive'>
//         <tbody>
//           <tr>
//             <th scope='row'>Date Found</th>
//             <td>{this.props.trailItem.date_found}</td>
//           </tr>
//           <tr>
//             <th scope='row'>Reporting Person</th>
//             <td>{this.props.trailItem.reporting_person}</td>
//           </tr>
//           <tr>
//             <th scope='row'>GPS Location</th>
//             <td></td>
//           </tr>
//           <tr>
//             <th scope='row'>Trail Head Entrance</th>
//             <td>{this.props.trailItem.trailhead_entrance}</td>
//           </tr>
//           <tr>
//             <th scope='row'>Distance from Trailhead</th>
//             <td>{this.props.trailItem.distance}</td>
//           </tr>
//           <tr>
//             <th scope='row'>Open/Complete</th>
//             <td>
//               <div className='custom-control custom-radio'>
//                 <input
//                   type='radio'
//                   id='open'
//                   name='isfinished'
//                   className='custom-control-input'
//                 ></input>
//                 <label className='custom-control-label' htmlFor='open'>
//                   Open
//                 </label>
//               </div>
//               <div className='custom-control custom-radio'>
//                 <input
//                   type='radio'
//                   id='completed'
//                   name='isfinished'
//                   className='custom-control-input'
//                 ></input>
//                 <label className='custom-control-label' htmlFor='completed'>
//                   Completed
//                 </label>
//               </div>
//             </td>
//           </tr>
//           <tr>
//             <th scope='row'>Date Resolved</th>
//             <td>
//               <input type='date'></input>
//             </td>
//           </tr>
//           <tr>
//             <th scope='row'>Resolved by</th>
//             <td>
//               <div className='input-group'>
//                 <input
//                   type='text'
//                   className='form-control'
//                   placeholder='Sawyer name'
//                 ></input>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div class='card-body'>
//         {/* <a href='#' class='card-link'>
//           EDIT
//         </a>
//         <a href='#' class='card-link'>
//           DELETE
//         </a> */}
//       </div>
