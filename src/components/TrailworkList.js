import React from 'react';
import TrailworkListItem from './TrailworkListItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './trailworklist.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import TrailworkItem from './TrailItems/TrailworkItem';

class TrailworkList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { listStatus } = this.props.match.params;
    console.log(listStatus);
    this.props.fetchTrailItems(listStatus);
    console.log('I mounted');
  }

  renderListTitle = () => {
    const { listStatus } = this.props.match.params;

    console.log('title: ' + listStatus);
    switch (listStatus) {
      case 'completeditems':
        return 'Completed Items';
      case 'activeitems':
        return 'Active Items';
      case 'submitteditems':
        return 'Submitted Items for Approval';
      default:
        return 'Item List';
    }
  };

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

  sortTrailList = (category) => {
    if (this.props.trailItems) {
      const itemList = this.props.trailItems;
      const sortByKey = (key) => (a, b) => (a[key] > b[key] ? 1 : -1);
      const sortedList = itemList.slice().sort(sortByKey('reporting_person'));
      console.log(sortedList);

      // let newList = sortedList.forEach((trailItem) => {
      //   return <TrailworkListItem trailItem={trailItem} key={trailItem.key} />;
      // });

      document.getElementById('main-data-table').innerHTML = '';

      return sortedList.forEach((trailItem) => {
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
              <th colspan='7' className='text-center'>
                <h1>{this.renderListTitle()}</h1>
              </th>
            </tr>
            <tr>
              <th scope='col'>
                Date Found <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>
                Reported By <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>
                Trailhead <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col' onClick={this.sortTrailList}>
                Chapter <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>View</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody className='table-hover' id='main-data-table'>
            {this.renderTrailList()}
          </tbody>
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
