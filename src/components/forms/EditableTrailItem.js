import React from "react";
import { database } from "../../services/firebaseConfig";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./editabletrailitem.scss";

class EditableTrailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailhead: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    console.log("i am mounting the edit screen");
    console.log(this.props.trailItemId.trailItemId);
    console.log(this.props.itemStatus);

    database
      .ref(
        `${this.props.itemStatus}items/${this.props.trailItemId.trailItemId}`
      )
      .once("value", (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          localChapter: snapshot.val().local_chapter
            ? snapshot.val().local_chapter
            : "Not Entered",
          trailhead: snapshot.val().trailhead_entrance,
          trailItemPhoto: snapshot.val().trailItemPhoto || "",
          dateFound: snapshot.val().date_found,
          reportingPerson: snapshot.val().reporting_person,
          trailItemId: snapshot.val().trailItemId,
          gps_latitude: snapshot.val().gps_latitude
            ? snapshot.val().gps_latitude
            : 0,
          distance: snapshot.val().distance || 0,
          gps_longitude: snapshot.val().gps_longitude
            ? snapshot.val().gps_longitude
            : 0,
          mile_marker: snapshot.val().mile_marker
            ? snapshot.val().mile_marker
            : "",
          description: snapshot.val().description
            ? snapshot.val().description
            : "",
          selectedOption: snapshot.val().trailItemStatus
            ? snapshot.val().trailItemStatus
            : "active",
          dateResolved: snapshot.val().date_resolved
            ? snapshot.val().date_resolved
            : "",
          resolvedBy: snapshot.val().resolved_by
            ? snapshot.val().resolved_by
            : "",
        });
      });
  }

  renderSelectField = (field) => {
    return (
      <div className='form-group row'>
        <label
          htmlFor='local_chapter'
          className='col-sm-4 col-form-label text-sm-right'
        >
          {field.label}
        </label>

        <div className='col-sm-8'>
          <select
            {...field.input}
            onChange={(value) => field.input.onChange(value)}
            type='select'
            className='form-control'
            id='local_chapter'
          >
            {field.children}
          </select>
        </div>
      </div>
    );
  };

  handleInputChange = (e, field) => {
    console.log(e.target.value);
    this.setState({
      [field]: e.target.value,
    });
  };

  handleOptionChange = (changeEvent) => {
    console.log("changing radio status: " + changeEvent.target.value);
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  onHandleUpdate = (e) => {
    e.preventDefault();
    console.log("clicked update button");
    console.log(this.props.itemStatus);

    if (this.props.itemStatus === "submitted") {
      console.log("Finally my" + this.state.trailItemStatus);
      database.ref("activeitems").child(`${this.state.trailItemId}`).set({
        local_chapter: this.state.localChapter,
        trailhead_entrance: this.state.trailhead,
        date_found: this.state.dateFound,
        reporting_person: this.state.reportingPerson,
        trailItemId: this.state.trailItemId,
        trailItemPhoto: this.state.trailItemPhoto,
        gps_latitude: this.state.gps_latitude,
        gps_longitude: this.state.gps_longitude,
        distance: this.state.distance,
        description: this.state.description,
        mile_marker: this.state.mile_marker,
        trailItemStatus: this.state.selectedOption,
        date_resolved: this.state.dateResolved,
        resolved_by: this.state.resolvedBy,
      });

      console.log(this.state.trailItemId);
      database
        .ref("/submitteditems/" + this.state.trailItemId)
        .remove()
        .then(function () {
          console.log("Remove submitted succeeded.");
        });

      console.log("saved to active database");

      this.props.updateTrailItem(this.state.trailItemId);
      alert("Item Updated!");
      this.props.history.push(`/tablelist/activeitems`);
    } else if (this.state.selectedOption === "active") {
      database.ref("activeitems").child(`${this.state.trailItemId}`).update({
        local_chapter: this.state.localChapter,
        trailhead_entrance: this.state.trailhead,
        date_found: this.state.dateFound,
        reporting_person: this.state.reportingPerson,
        gps_latitude: this.state.gps_latitude,
        gps_longitude: this.state.gps_longitude,
        distance: this.state.distance,
        description: this.state.description,
        mile_marker: this.state.mile_marker,
        trailItemStatus: this.state.selectedOption,
        trailItemId: this.state.trailItemId,
        date_resolved: this.state.dateResolved,
        resolved_by: this.state.resolvedBy,
      });

      console.log("saved to active database");

      this.props.updateTrailItem(this.state.trailItemId);
      alert("Item updated!");
      this.props.history.push(`/tablelist/activeitems`);
    } else if (this.state.selectedOption === "completed") {
      database.ref("completeditems").child(`${this.state.trailItemId}`).set({
        local_chapter: this.state.localChapter,
        trailhead_entrance: this.state.trailhead,
        date_found: this.state.dateFound,
        reporting_person: this.state.reportingPerson,
        trailItemId: this.state.trailItemId,
        trailItemPhoto: this.state.trailItemPhoto,
        gps_latitude: this.state.gps_latitude,
        gps_longitude: this.state.gps_longitude,
        distance: this.state.distance,
        description: this.state.description,
        mile_marker: this.state.mile_marker,
        trailItemStatus: this.state.selectedOption,
        date_resolved: this.state.dateResolved,
        resolved_by: this.state.resolvedBy,
      });
      let activeItemRef = database.ref("activeitems/" + this.state.trailItemId);
      activeItemRef.remove().then(function () {
        console.log("Remove active succeeded.");
      });

      console.log("saved to completed database");
      this.props.updateTrailItem(this.state.trailItemId);
      this.setState({
        hasFetched: false,
      });
      alert("Item Updated!");
      this.props.history.push(`/tablecomplete`);
    }
  };

  render = (props) => {
    const { itemStatus } = this.props;

    return (
      <main className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='editableitem-card card col-md-8 mt-4 mb-5 p-2'>
            <h5 className='card-title text-center pt-2'>Trailhead:</h5>
            <p className='card-text'>
              <input
                type='text'
                value={this.state.trailhead}
                onChange={(e) => this.handleInputChange(e, "trailhead")}
                className='textarea-box'
              />
            </p>

            <h5 className='card-title text-center pt-2'>Description: </h5>
            <p className='card-text'>
              <input
                type='text'
                value={this.state.description}
                onChange={(e) => this.handleInputChange(e, "description")}
                className='textarea-box'
              />
            </p>
            {this.state.trailItemPhoto ? (
              <img
                className='card-img-top trailitem-card-image mx-auto'
                alt='Nothing uploaded'
                src={this.state.trailItemPhoto}
              />
            ) : (
              <p>No photo provided</p>
            )}
            <div className='card-body'>
              <table className='table table-hover'>
                <tbody className='w-100'>
                  <tr class='row'>
                    <th scope='row' className='col-sm-4'>
                      Date Found
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='date'
                        value={this.state.dateFound}
                        onChange={(e) => this.handleInputChange(e, "dateFound")}
                      />
                    </td>
                  </tr>
                  <tr className='form-group row'>
                    <th scope='row' className='col-sm-4 col-form-label'>
                      Local Chapter
                    </th>
                    <td className='col-sm-8'>
                      <select
                        value={this.state.localChapter}
                        onChange={(e) =>
                          this.handleInputChange(e, "localChapter")
                        }
                        className='form-control'
                      >
                        <option value=''>Choose Local Chapter</option>

                        <option value='State of Michigan'>
                          Entire state of Michigan
                        </option>
                        <option value='Western Michigan Chapter'>
                          Western Michigan Chapter
                        </option>
                        <option value='Harbor Springs Chapter'>
                          Harbor Springs Chapter
                        </option>
                        <option value='Jordan Valley 45 Chapter'>
                          Jordan Valley 45 Chapter
                        </option>
                        <option value='Spirit of the Woods Chapter'>
                          Spirit of the Woods Chapter
                        </option>
                        <option value='Chief Noonday Chapter'>
                          Chief Noonday Chapter
                        </option>
                        <option value='Grand Traverse Hiking Club Chapter'>
                          Grand Traverse Hiking Club Chapter
                        </option>
                        <option value='Chief Baw Beese Chapter'>
                          Chief Baw Beese Chapter
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Reporting Person
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='text'
                        value={this.state.reportingPerson}
                        onChange={(e) =>
                          this.handleInputChange(e, "reportingPerson")
                        }
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      GPS Latitude
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='number'
                        value={this.state.gps_latitude}
                        onChange={(e) =>
                          this.handleInputChange(e, "gps_latitude")
                        }
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      GPS Longitude
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='number'
                        value={this.state.gps_longitude}
                        onChange={(e) =>
                          this.handleInputChange(e, "gps_longitude")
                        }
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      TrailHead
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='text'
                        rows='4'
                        value={this.state.trailhead}
                        onChange={(e) => this.handleInputChange(e, "trailhead")}
                        className='w-100'
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Mile Marker
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='text'
                        value={this.state.mile_marker}
                        onChange={(e) =>
                          this.handleInputChange(e, "mile_marker")
                        }
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Distance from Trailhead
                    </th>
                    <td className='col-sm-8'>
                      <input
                        type='text'
                        value={this.state.distance}
                        onChange={(e) => this.handleInputChange(e, "distance")}
                      />
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Status
                    </th>
                    <td className='col-sm-8'>
                      <div className='form-check'>
                        <label
                          className='form-check-label'
                          htmlFor='activeItem'
                        >
                          <input
                            type='radio'
                            id='activeItem'
                            name='trailItemStatus'
                            className='form-check-input'
                            value='active'
                            checked={this.state.selectedOption === "active"}
                            onChange={this.handleOptionChange}
                          />
                          Active
                        </label>
                      </div>
                      <div className='form-check'>
                        <label
                          className='form-check-label'
                          htmlFor='completedItem'
                        >
                          <input
                            type='radio'
                            id='completedItem'
                            name='trailItemStatus'
                            className='form-check-input'
                            value='completed'
                            checked={this.state.selectedOption === "completed"}
                            onChange={this.handleOptionChange}
                          />
                          Completed
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Date Resolved
                    </th>
                    <td className='col-sm-8'>
                      <div className='form-group'>
                        <input
                          type='date'
                          className='form-control'
                          value={this.state.dateResolved}
                          onChange={(e) =>
                            this.handleInputChange(e, "dateResolved")
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className='row'>
                    <th className='col-sm-4' scope='row'>
                      Resolved by
                    </th>
                    <td className='col-sm-8'>
                      <div className='form-group'>
                        <input
                          type='text'
                          value={this.state.resolvedBy}
                          onChange={(e) =>
                            this.handleInputChange(e, "resolvedBy")
                          }
                          className='form-control'
                          placeholder='Sawyer name'
                        ></input>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='row d-flex justify-content-between'>
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
                    console.log("clicked cancel");
                    itemStatus === "completed"
                      ? this.props.history.push(`/tablecomplete`)
                      : this.props.history.push(
                          `/tablelist/${itemStatus}items`
                        );
                    // this.props.history.push(`/tablelist/${itemStatus}items`);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
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
