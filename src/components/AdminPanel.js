import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapter: '',
      usState: '',
    };
  }

  displayChapter = (e) => {
    this.setState({ chapter: e.target.value });
    console.log(e.target.value);
  };

  // displayState = e => {
  //   this.setState({ usState: e.target.value });
  //   console.log(e.target.value);
  // };

  handleChapterSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.chapter);
    this.props.history.push('/optionspanel');
  };

  render() {
    return (
      <div className='d-flex'>
        <form onSubmit={this.handleChapterSubmit}>
          <select
            className='custom-select'
            id='chapterOptions'
            onChange={this.displayChapter}
            value={this.state.value}
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
          </select>
          <button type='submit' value='Submit' className='btn btn-success'>
            Submit
          </button>
        </form>
      </div>
      // {/* <div className="col-1 d-flex justify-content-center align-content-center">
      //     <p>OR</p>
      //   </div>
      //   <div className="col-5">
      //     <form>
      //       <select
      //         value={this.state.usState}
      //         id="stateOptions"
      //         onChange={this.displayState}
      //         className="custom-select"
      //       >
      //         <option value="">Choose State</option>
      //         <option value="Michigan(Upper Peninsula)">
      //           Michigan(Upper Peninsula)
      //         </option>
      //         <option value="Minnesota">Minnesota</option>
      //         <option value="New York">New York</option>
      //         <option value="North Dakota">North Dakota</option>
      //         <option value="Ohio">Ohio</option>
      //         <option value="Pennsylvania">Pennsylvania</option>
      //         <option value="Vermont">Vermont</option>
      //         <option value="Wisconsin">Wisconsin</option>
      //       </select>
      //     </form>
      //   </div> */}
    );
  }
}

export default withRouter(AdminPanel);
