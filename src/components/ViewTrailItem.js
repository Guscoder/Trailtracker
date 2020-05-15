import React from 'react';
import TrailworkItem from './TrailItems/TrailworkItem';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ViewTrailItem extends React.Component {
  componentDidMount(props) {
    console.log('I mounted the trail card');
    console.log(this.props);
  }

  renderTrailItem = () => {
    if (this.props.trailItems) {
      let currentTrailItem = this.props.trailItems.find((trailItem) => {
        // console.log('the find function is running with this: ' + trailItem);
        return this.props.trailItemId === trailItem.trailItemId;
      });
      return <TrailworkItem trailItem={currentTrailItem} />;
    } else {
      return <p>Error: Can't access list of trail items.</p>;
    }
  };

  render() {
    return (
      <div className='container center'>
        <div>{this.renderTrailItem()}</div>
      </div>
    ); //
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
    trailItemId: state.trailItemId.trailItemId,
  };
};

export default connect(mapStateToProps, actions)(ViewTrailItem);
