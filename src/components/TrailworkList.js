import React from 'react';
import TrailworkListItem from './TrailworkListItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './trailworklist.scss';

class TrailworkList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { listStatus } = this.props.match.params;
    console.log(listStatus);
    this.props.fetchTrailItems(listStatus);
    console.log('I mounted');
  }

  renderTrailList = () => {
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
      <main className='trailworklist-table-container'>
        <table className='table table-striped'>
          <thead className='trailworklist-table-head'>
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
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(TrailworkList);
