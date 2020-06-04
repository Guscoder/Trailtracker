import React, { Component } from 'react';
import Header from './Header';
import './home.scss';

export default class Home extends Component {
  render() {
    return (
      <main className='home-screen'>
        <img
          className=''
          src={require('../assets/images/NCTsign.jpeg')}
          alt='north country trail sign'
        />
      </main>
    );
  }
}
