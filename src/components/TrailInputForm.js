import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addTrailItem } from "../actions";

const textareaStyle = {
  height: "100px"
};

class TrailInputForm extends React.Component {
  renderInput({ input, type, label, name, placeholder }) {
    return (
      <div className="form-group row">
        <label htmlFor="local_chapter" className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <input
            {...input}
            type={type}
            className="form-control"
            id={name}
            placeholder={placeholder}
          ></input>
        </div>
      </div>
    );
  }

  onSubmit = formValues => {
    console.log(formValues);
    this.props.addTrailItem(formValues);
    this.props.history.push(`/trailworklist`);
  };

  render() {
    // console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          type="text"
          name="local_chapter"
          component={this.renderInput}
          label="Local Chapter:"
          placeholder="Local Chapter Name"
        />
        <Field
          tyupe="text"
          name="reporting_person"
          component={this.renderInput}
          label="Reporting Person:"
          placeholder=" Name of Reporting Person"
        />
        <Field
          type="text"
          name="sawyer_name"
          component={this.renderInput}
          label="Sawyer Name:"
          placeholder="Sawyer Name"
        />
        <Field
          type="date"
          name="Date Found"
          component={this.renderInput}
          label="Date Found:"
        />
        <Field
          type="number"
          name="gps_latitude"
          component={this.renderInput}
          label="GPS Latitude:"
          placeholder="Enter GPS latitude if known"
        />
        <Field
          type="number"
          name="gps_longitude"
          component={this.renderInput}
          label="GPS Longitude:"
          placeholder="Enter GPS latitude if known"
        />
        <Field
          type="text"
          name="trailhead_entrance"
          component={this.renderInput}
          label="Trail Entrance:"
          placeholder="Trail head to enter at"
        />
        <Field
          type="text"
          name="distance"
          component={this.renderInput}
          label="Distance:"
          placeholder="Approx distance from trail head"
        />
        <Field
          type="file"
          name="trail_image"
          component={this.renderInput}
          label="Trail Photo:"
          placeholder="Upload photo of problem"
        />
        <Field
          type="text"
          name="description"
          component={this.renderInput}
          label="Description:"
          placeholder="Description of trail issue"
        />

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

// // connect to provider which connects to data in Redux Store
// const mapStateToProps = state => {
//   return { trailItems: state.initTrailworkState }; // this object shows up as props inside our component
// };

// // export connect(mapStateToProps)(TrailInputForm);

const mapDispatchToProps = dispatch => {
  return {
    addTrailItem: formValues => dispatch(addTrailItem(formValues))
  };
};

const formWrapped = reduxForm({
  form: "trailIssueForm"
})(TrailInputForm);

export default connect(mapDispatchToProps, { addTrailItem })(formWrapped);
