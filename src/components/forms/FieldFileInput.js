import React, { Component } from 'react';
import PreviewPicture from './PreviewPicture';

class FieldFileInput extends Component {
  constructor(state) {
    super(state);
    this.state = {
      picture: null,
      pictureUrl: null,
    };
  }

  displayPicture(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    //.onload not working below
    reader.onload = (event) => {
      this.setState({
        picture: file,
        pictureUrl: reader.result,
      });
      reader.readAsDataURL(file);
    };
  }

  render() {
    const { label, input } = this.props;
    delete input.value;
    return (
      <div>
        <div className='form-group row'>
          <label className='col-sm-4 col-form-label text-sm-right'>
            {label}
          </label>
          <div className='col-sm-7'>
            <input
              type='file'
              className='form-control-file'
              {...input}
              onChange={(event) => {
                this.displayPicture(event);
              }}
            ></input>
          </div>
        </div>
        <PreviewPicture pictureUrl={this.state.pictureUrl} />
      </div>
    );
  }
}

export default FieldFileInput;
