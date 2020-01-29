import React from "react";
import TrailworkItem from "./TrailworkItem";
import { connect } from "react-redux";

class TrailworkList extends React.Component {
  render() {
    console.log(this.props.trailItems);
    return (
      <div className="ui relaxed divided list">
        Hi Im a list
        {this.props.trailItems &&
          this.props.trailItems.map(trailItem => {
            return (
              <TrailworkItem
                trailItem={trailItem}
                key={this.props.trailItems.indexOf(trailItem)}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trailItems: state.trailwork.trailItems
  };
};

export default connect(mapStateToProps)(TrailworkList);
