import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTrailItem } from '../../actions';
import FieldFileInput from './FieldFileInput';
import './volunteerinputform.scss';

class VolunteerInputForm extends React.Component {
  renderInput({ input, type, label, name, placeholder, hideMe }) {
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
            // defaultValue
          ></input>
        </div>
      </div>
    );
  }
  renderSelectField = (field) => {
    // console.log(field.input.value);
    return (
      <div className='form-group row'>
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
        </div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.addTrailItem(formValues, 'submitted');
    this.props.history.push(`/optionspanel`);
  };

  render() {
    return (
      <main className='container volunteer-form-container p-2'>
        <div className='row d-flex justify-content-center'></div>
        <div className='input-card card mt-3 p-2'>
          <h1 className='text-center'>Trail Maintenance Item Form</h1>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='mt-5'
          >
            <Field
              type='select'
              name='local_chapter'
              component={this.renderSelectField}
              label='Local Chapter:'
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
            />

            <Field
              type='text'
              name='reporting_person'
              component={this.renderInput}
              label='Reporting Person:'
              placeholder=' Name of Reporting Person'
            />
            <Field
              type='date'
              name='date_found'
              component={this.renderInput}
              label='Date Found:'
            />
            <Field
              type='number'
              name='gps_latitude'
              component={this.renderInput}
              label='GPS Latitude:'
              placeholder='Enter GPS latitude if known'
            />
            <Field
              type='number'
              name='gps_longitude'
              component={this.renderInput}
              label='GPS Longitude:'
              placeholder='Enter GPS latitude if known'
            />
            <Field
              type='text'
              name='trailhead_entrance'
              component={this.renderInput}
              label='Trail Entrance:'
              placeholder='Trail head to enter at'
            />
            <Field
              type='text'
              name='distance'
              component={this.renderInput}
              label='Distance:'
              placeholder='Approx distance from trail head'
            />
            <Field
              type='text'
              name='description'
              component={this.renderInput}
              label='Description:'
              placeholder='Description of trail issue'
            />
            <Field
              type='text'
              name='trailItemStatus'
              component={this.renderInput}
              defaultValue='active'
              hideMe='d-none'
            />

            <div className='form-group row'>
              <div className='col-sm-7 offset-sm-5'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTrailItem: (formValues, itemStatus) =>
      dispatch(addTrailItem(formValues, itemStatus)),
  };
};

const formWrapped = reduxForm({
  form: 'volunteerInputForm',
})(VolunteerInputForm);

export default connect(mapDispatchToProps, { addTrailItem })(formWrapped);
