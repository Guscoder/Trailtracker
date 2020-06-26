import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import '../styles/config-styles.scss';
import './layout.scss';

import AdminMenu from './AdminMenu';

const Layout = (props) => {
  return (
    <div className='main-layout'>
      <Header />

      {props.isAuthenticated ? (
        <>
          <div className='nav-spacer'></div>
          <AdminMenu />
        </>
      ) : (
        ''
      )}
      <div className='content'>{props.children}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Layout);
// export default Layout;
