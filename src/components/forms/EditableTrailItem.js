import React from 'react';
import { database } from '../../services/firebaseConfig';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './editabletrailitem.scss';
class EditableTrailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailhead: '',
    };
  }

  componentDidMount() {
    console.log('Editable mounted');
    console.log(this.props);
    console.log(this.props.trailItemId.trailItemId);
    console.log(this.props.itemStatus);

    database
      .ref(
        `${this.props.itemStatus}items/${this.props.trailItemId.trailItemId}`
      )
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          localChapter: snapshot.val().local_chapter
            ? snapshot.val().local_chapter
            : 'Not Entered',
          trailhead: snapshot.val().trailhead_entrance,
          trailItemPhoto: snapshot.val().trailItemPhoto,
          dateFound: snapshot.val().date_found,
          reportingPerson: snapshot.val().reporting_person,
          trailItemId: snapshot.val().trailItemId,
          gpsLatitude: snapshot.val().gps_latitude
            ? snapshot.val().gps_latitude
            : 0,
          distance: snapshot.val().distance,
          gpsLongitude: snapshot.val().gps_longitude
            ? snapshot.val().gps_longitude
            : 0,
          description: snapshot.val().description
            ? snapshot.val().description
            : '',
          selectedOption: snapshot.val().trailItemStatus
            ? snapshot.val().trailItemStatus
            : 'active',
          dateResolved: snapshot.val().date_resolved
            ? snapshot.val().date_resolved
            : '',
          resolvedBy: snapshot.val().resolved_by
            ? snapshot.val().resolved_by
            : '',
        });
      });
  }

  handleInputChange = (e, field) => {
    console.log(e.target.value);
    this.setState({
      [field]: e.target.value,
    });
  };

  handleOptionChange = (changeEvent) => {
    console.log('changing radio status: ' + changeEvent.target.value);
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  onHandleUpdate = (e) => {
    e.preventDefault();
    console.log('clicked update button');

    if (this.state.selectedOption === 'active') {
      database.ref('activeitems').child(`${this.state.trailItemId}`).update({
        trailhead_entrance: this.state.trailhead,
        date_found: this.state.dateFound,
        reporting_person: this.state.reportingPerson,
        gps_latitude: this.state.gpsLatitude,
        gps_longitude: this.state.gpsLongitude,
        distance: this.state.distance,
        description: this.state.description,
        trailItemStatus: this.state.selectedOption,
        date_resolved: this.state.dateResolved,
        resolved_by: this.state.resolvedBy,
      });

      console.log('saved to active database');
      this.props.updateTrailItem(this.state.trailItemId);
      this.props.history.push(`/TrailworkList/activeitems`);
    } else if (this.state.selectedOption === 'completed') {
      database.ref('completeditems').child(`${this.state.trailItemId}`).set({
        local_chapter: this.state.localChapter,
        trailhead_entrance: this.state.trailhead,
        date_found: this.state.dateFound,
        reporting_person: this.state.reportingPerson,
        trailItemId: this.state.trailItemId,
        trailItemPhoto: this.state.trailItemPhoto,
        gps_latitude: this.state.gpsLatitude,
        gps_longitude: this.state.gpsLongitude,
        distance: this.state.distance,
        description: this.state.description,
        trailItemStatus: this.state.selectedOption,
        date_resolved: this.state.dateResolved,
        resolved_by: this.state.resolvedBy,
      });
      let activeItemRef = database.ref(
        '/activeitems/' + this.state.trailItemId
      );
      activeItemRef.remove().then(function () {
        console.log('Remove active succeeded.');
      });

      console.log('saved to completed database');
      this.props.updateTrailItem(this.state.trailItemId);

      this.props.history.push(`/TrailworkList/completeditems`);
    }

    // this.props.updateTrailItem(this.state.trailItemId);

    // this.props.history.push(`/TrailworkList`);
  };

  render = (props) => {
    // const trailItemId = this.props.trailItemId.trailItemId;
    // console.log('now logging ' + this.props.trailItemId.trailItemId);

    return (
      <article className='row justify-content-center'>
        <div className='editableitem-card col-md-7 card mt-3 mb-5 p-2'>
          <div className='card-body d-flex flex-column justify-content-center'>
            <h5 className='card-title center'>
              Trailhead:{' '}
              <input
                type='text'
                value={this.state.trailhead}
                onChange={(e) => this.handleInputChange(e, 'trailhead')}
              />
            </h5>
            <p className='card-text'>
              The problem on this trail is the relatively steep incline of 38
              degrees. Plus there is a large boulder that has completely clocked
              the trail aout five miles in.
            </p>
            <img
              className='card-img-top trailitem-card-image mx-auto'
              alt='...'
              src={this.state.trailItemPhoto}
            />
          </div>
          <table className='table table-hover'>
            <tbody className='w-100'>
              <tr>
                <th scope='row'>Date Found</th>
                <td>
                  <input
                    type='date'
                    value={this.state.dateFound}
                    onChange={(e) => this.handleInputChange(e, 'dateFound')}
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>Local Chapter</th>
                <td>
                  <input
                    type='text'
                    value={this.state.localChapter}
                    onChange={(e) => this.handleInputChange(e, 'localChapter')}
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>Reporting Person</th>
                <td>
                  <input
                    type='text'
                    value={this.state.reportingPerson}
                    onChange={(e) =>
                      this.handleInputChange(e, 'reportingPerson')
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>GPS Location</th>

                <td>
                  <input
                    type='number'
                    value={this.state.gpsLatitude}
                    onChange={(e) => this.handleInputChange(e, 'gpsLatitude')}
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>Trail Head Entrance</th>
                <td>
                  <input
                    type='text'
                    value={this.state.trailhead}
                    onChange={(e) => this.handleInputChange(e, 'trailhead')}
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>Distance from Trailhead</th>
                <td>
                  <input
                    type='text'
                    value={this.state.distance}
                    onChange={(e) => this.handleInputChange(e, 'distance')}
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'>Status</th>
                <td>
                  <div className='form-check'>
                    <label className='form-check-label' htmlFor='activeItem'>
                      <input
                        type='radio'
                        id='activeItem'
                        name='trailItemStatus'
                        className='form-check-input'
                        value='active'
                        checked={this.state.selectedOption === 'active'}
                        onChange={this.handleOptionChange}
                      />
                      Active
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label' htmlFor='completedItem'>
                      <input
                        type='radio'
                        id='completedItem'
                        name='trailItemStatus'
                        className='form-check-input'
                        value='completed'
                        checked={this.state.selectedOption === 'completed'}
                        onChange={this.handleOptionChange}
                      />
                      Completed
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope='row'>Date Resolved</th>
                <td>
                  <div className='form-group'>
                    <input
                      type='date'
                      className='form-control'
                      value={this.state.dateResolved}
                      onChange={(e) =>
                        this.handleInputChange(e, 'dateResolved')
                      }
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope='row'>Resolved by</th>
                <td>
                  <div className='form-group'>
                    <input
                      type='text'
                      value={this.state.resolvedBy}
                      onChange={(e) => this.handleInputChange(e, 'resolvedBy')}
                      className='form-control'
                      placeholder='Sawyer name'
                    ></input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='card-body d-flex justify-content-between'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={this.onHandleUpdate}
            >
              Submit Changes
            </button>
            <button
              type='submit'
              className='btn btn-danger'
              onClick={() => {
                console.log('clicked cancel');
                this.props.history.push(`/TrailworkList/activeitems`);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    trailItemId: state.trailItemId,
    itemStatus: state.updateTrailItem.trailItemStatus,
  };
};

export default connect(mapStateToProps, actions)(withRouter(EditableTrailItem));
