import React from 'react';
import { database } from '../firebaseConfig';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EditableTrailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailhead: '',
    };
  }

  componentDidMount() {
    console.log('Editable mounted');
    console.log(this.props.trailItemId.trailItemId);

    database
      .ref(`trailitems/${this.props.trailItemId.trailItemId}`)
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          trailhead: snapshot.val().trailhead_entrance,
          trailItemPhoto: snapshot.val().trailItemPhoto,
          dateFound: snapshot.val().date_found,
          reportingPerson: snapshot.val().reporting_person,
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
    database
      .ref('trailitems')
      .child(`${this.props.trailItemId.trailItemId}`)
      .update({
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
    // this.setState({
    //   title: '',
    //   body: '',
    // });
    this.props.updateTrailItem(this.props.trailItemId.trailItemId);

    this.props.history.push(`/TrailworkList`);
  };

  render = () => {
    // const trailItemId = this.props.trailItemId.trailItemId;
    // console.log('now logging ' + this.props.trailItemId.trailItemId);

    return (
      <article className='w-100 d-flex justify-content-center'>
        <div className='card w-50 mt-3 p-2'>
          <img
            className='card-img-top img-fluid'
            alt='...'
            src={this.state.trailItemPhoto}
          />
          <div className='card-body'>
            <h5 className='card-title'>
              Trailhead:
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
                this.props.history.push(`/TrailworkList`);
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
  };
};

export default connect(mapStateToProps, actions)(withRouter(EditableTrailItem));
