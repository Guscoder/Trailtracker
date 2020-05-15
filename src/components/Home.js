import React, { Component } from 'react';
import nctsign from '../images/NCTsign.jpeg';

const imageStyle = {
  objectFit: 'contain',
  // width: 'auto',
  // height: '100vh',
};

export default class Home extends Component {
  render() {
    return (
      <div>
        <img
          className='img-fluid'
          src={nctsign}
          style={imageStyle}
          alt='NCT trail map'
        />
      </div>
    );
  }
}
