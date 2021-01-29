import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addTrailItem } from "../../actions";
import FieldFileInput from "./FieldFileInput";
import "./trailinputform.scss";

const required = (value) => (value ? undefined : "Required");
const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

class TrailInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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

  renderInput({
    input,
    type,
    label,
    name,
    placeholder,
    hideMe,
    meta: { touched, error, warning },
  }) {
    return (
      <div className='form-group row'>
        <label htmlFor={name} className='col-sm-4 col-form-label text-sm-right'>
          {label}
        </label>
        <div className='col-sm-7'>
          <input
            {...input}
            type={type}
            className={`form-control ${hideMe}`}
            id={name}
            placeholder={placeholder}
          ></input>
          <div className='error'>
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </div>
        </div>
      </div>
    );
  }
  renderSelectField = (field) => {
    const className = `form-group row ${
      field.meta.touched && field.meta.error ? "has-error" : ""
    }`;
    return (
      <div className={className}>
        <label
          htmlFor='local_chapter'
          className='col-sm-4 col-form-label text-sm-right'
        >
          {field.label}
        </label>

        <div className='col-sm-7'>
          <select
            {...field.input}
            onChange={(value) => field.input.onChange(value)}
            type='select'
            className='form-control'
            id='local_chapter'
          >
            {field.children}
          </select>
          <div className='error'>
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  };
  displayFormPreview = () => {
    const element = document.getElementById("preview-card");
    element.classList.remove("d-none");
  };
  removeFormPreview = () => {
    const element = document.getElementById("preview-card");
    element.classList.add("d-none");
  };
  submitData = (formValues) => {
    this.props.addTrailItem(formValues);
    this.props.history.push(`/optionspanel`);
  };

  render() {
    return (
      <main className='container input-form-container pt-3 pb-5'>
        <div className='row d-flex justify-content-center'></div>

        <div className='input-card card p-2'>
          <div id='preview-card' className='preview-card d-none'>
            <table className='table table-hover w-75'>
              <tbody>
                <tr>
                  <th colSpan='2'>
                    <h1 className='text-center'>Trail Item Preview</h1>
                  </th>
                </tr>

                <tr className='row '>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Local Chapter:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.localChapter || "MUST INCLUDE CHAPTER NAME!"}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Reporting Person:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.reportingPerson ||
                      "MUST INCLUDE REPORTING PERSON!"}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Date Found:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.dateFound || "MUST INCLUDE DATE!"}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    GPS Latitude:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.gpsLatitude || ""}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    GPS Longitude:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.gpsLongitude || ""}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Mile Marker:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.mileMarker || ""}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Trail Entrance:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.trailhead ||
                      "MUST INCLUDE NAME OF TRAIL ENTRANCE!"}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Distance:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.distance || ""}
                  </td>
                </tr>
                <tr className='row'>
                  <th scope='row' className='col-sm-6 text-sm-right'>
                    Description:
                  </th>
                  <td className='col-sm-6 text-sm-left'>
                    {this.state.description || ""}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='row d-flex justify-content-center'>
              <button
                onClick={this.removeFormPreview}
                className='btn btn-primary preview-button m-2'
              >
                Back/Edit
              </button>
              <label
                htmlFor='submit-form'
                tab-index='0'
                type='submit'
                onSubmit={this.props.handleSubmit(this.submitData)}
                className='btn btn-primary m-2'
              >
                Submit
              </label>
            </div>
          </div>
          <h1 className='text-center'>Trail Maintenance Item Form</h1>
          <form
            onSubmit={this.props.handleSubmit(this.submitData)}
            className='mt-5'
          >
            <Field
              type='select'
              name='local_chapter'
              component={this.renderSelectField}
              label='Local Chapter:'
              validate={[required]}
              value={this.state.localChapter || ""}
              onChange={(e) => this.handleInputChange(e, "localChapter")}
            >
              <optgroup>
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
              </optgroup>
            </Field>

            <Field
              name='trail_image'
              component={FieldFileInput}
              label='Trail Photo:'
              value={this.state.imageFile || ""}
              onChange={(e) => this.handleInputChange(e, "imageFile")}
            />

            <Field
              type='text'
              name='reporting_person'
              component={this.renderInput}
              label='Reporting Person:'
              validate={[required]}
              placeholder=' Name of Reporting Person'
              value={this.state.reportingPerson || ""}
              onChange={(e) => this.handleInputChange(e, "reportingPerson")}
            />
            <Field
              type='date'
              name='date_found'
              component={this.renderInput}
              validate={[required]}
              label='Date Found:'
              value={this.state.dateFound || ""}
              onChange={(e) => this.handleInputChange(e, "dateFound")}
            />
            <Field
              type='number'
              name='gps_latitude'
              component={this.renderInput}
              label='GPS Latitude:'
              placeholder='Enter GPS latitude if known'
              value={this.state.gpsLatitude || ""}
              onChange={(e) => this.handleInputChange(e, "gpsLatitude")}
            />
            <Field
              type='number'
              name='gps_longitude'
              component={this.renderInput}
              label='GPS Longitude:'
              placeholder='Enter GPS latitude if known'
              value={this.state.gpsLongitude || ""}
              onChange={(e) => this.handleInputChange(e, "gpsLongitude")}
            />
            <Field
              type='number'
              name='mile_marker'
              component={this.renderInput}
              label='Mile Marker:'
              placeholder='Mile Marker #'
              validate={[number]}
              value={this.state.mileMarker || ""}
              onChange={(e) => this.handleInputChange(e, "mileMarker")}
            />
            <Field
              type='text'
              name='trailhead_entrance'
              component={this.renderInput}
              label='Trail Entrance:'
              placeholder='Trail head to enter at'
              validate={[required]}
              value={this.state.trailhead || ""}
              onChange={(e) => this.handleInputChange(e, "trailhead")}
            />
            <Field
              type='text'
              name='distance'
              component={this.renderInput}
              label='Distance:'
              placeholder='Approx distance from trail head'
              validate={[number]}
              value={this.state.distance || ""}
              onChange={(e) => this.handleInputChange(e, "distance")}
            />
            <Field
              type='text'
              name='description'
              component={this.renderInput}
              label='Description:'
              placeholder='Description of trail issue'
              value={this.state.description || ""}
              onChange={(e) => this.handleInputChange(e, "description")}
            />
            <Field
              type='text'
              name='trailItemStatus'
              component={this.renderInput}
              defaultValue='active'
              hideMe='d-none'
            />

            <div className='form-group row d-flex justify-content-center'>
              <button
                type='button'
                onClick={this.displayFormPreview}
                className='btn btn-primary preview-button m-2'
              >
                Preview Item Data
              </button>
              <button
                type='submit'
                // onSubmit={this.submitData}
                id='submit-form'
                className='btn btn-primary m-2'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTrailItem: (formValues) => dispatch(addTrailItem(formValues)),
  };
};

const formWrapped = reduxForm({
  form: "trailIssueForm",
})(TrailInputForm);

export default connect(mapDispatchToProps, { addTrailItem })(formWrapped);
