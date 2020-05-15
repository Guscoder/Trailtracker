import React from 'react';
import TrailworkListItem from './TrailworkListItem';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TrailworkList extends React.Component {
  componentDidMount() {
    this.props.fetchTrailItems();
    console.log('I mounted');
  }

  renderTrailList = () => {
    // console.log(typeof this.props.trailItems);
    // console.log(this.props.trailItems);
    if (this.props.trailItems) {
      return this.props.trailItems.map((trailItem) => {
        return <TrailworkListItem trailItem={trailItem} key={trailItem.key} />;
      });
    } else {
      return (
        <tr>
          <td>Loading</td>
        </tr>
      );
    }
  };

  render() {
    return (
      <div className='container-fluid'>
        <table className='table table-striped mt-2'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Date Found</th>
              <th scope='col'>Reported By</th>
              <th scope='col'>Trailhead</th>
              <th scope='col'>Chapter</th>
              <th scope='col'>View</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody className='table-hover'>{this.renderTrailList()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(TrailworkList);
