import React from "react";

const TrailworkItem = ({ trailItem }) => {
  return (
    <div>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Date Found</th>
            <td>{trailItem.date_found}</td>
          </tr>
          <tr>
            <th scope="row">GPS Location</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Trail Head Entrance</th>
            <td>{trailItem.trail_entrance}</td>
          </tr>
          <tr>
            <th scope="row">Distance from Trailhead</th>
            <td>{trailItem.distance}</td>
          </tr>
          <tr>
            <th scope="row">Photo</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Reporting Person</th>
            <td>{trailItem.reporting_person}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{trailItem.description}</td>
          </tr>
          <tr>
            <th scope="row">Open/Complete</th>
            <td>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="open"
                  name="isfinished"
                  className="custom-control-input"
                ></input>
                <label className="custom-control-label" htmlFor="open">
                  Open
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="completed"
                  name="isfinished"
                  className="custom-control-input"
                ></input>
                <label className="custom-control-label" htmlFor="completed">
                  Completed
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">Date Resolved</th>
            <td>
              <input type="date"></input>
            </td>
          </tr>
          <tr>
            <th scope="row">Sawyer Name</th>
            <td>
              <div className="input-group">
                <input type="text" className="form-control"></input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrailworkItem;
