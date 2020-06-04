import React from 'react';
import Header from './Header';
import '../styles/config-styles.scss';

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className='content'>{props.children}</div>
    </div>
  );
};

export default Layout;
