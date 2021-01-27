import React, { Component } from "react";
import PreviewPicture from "./PreviewPicture";

class FieldFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      pictureUrl: null,
    };
  }

  // displayPicture(event) {
  //   let reader = new FileReader();
  //   let file = event.target.files[0];
  //   //.onload not working below
  //   reader.onload = (event) => {
  //     this.setState({
  //       picture: file,
  //       pictureUrl: reader.result,
  //     });
  //     reader.readAsDataURL(file);
  //   };
  // }

  // onChange(e) {
  //   const {
  //     input: { onChange },
  //   } = this.props;
  //   onChange(e.target.files[0]);
  // }

  onImageChange = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0]),
      });
      console.log(this.state.image);
    }
  };

  render() {
    const { label, input } = this.props;
    console.log(input.value);
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
              onChange={this.onImageChange}
              // onChange={(event) => {
              //   this.displayPicture(event);
              // }}
            ></input>
            <PreviewPicture pictureUrl={this.state.image} />
          </div>
        </div>
      </div>
    );
  }
}

export default FieldFileInput;
