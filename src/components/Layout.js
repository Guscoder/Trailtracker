import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import "../styles/config-styles.scss";
import "./layout.scss";

import AdminMenu from "./AdminMenu";

const Layout = (props) => {
  console.log(props.currentUserRole);
  return (
    <div className='main-layout'>
      <Header />
      {props.isAuthenticated &&
      (props.currentUserRole === "ADMIN" ||
        props.currentUserRole === "SAWYER") ? (
        <>
          <div className='nav-spacer'></div>
          <AdminMenu />
        </>
      ) : (
        ""
      )}

      <div className='content'>{props.children}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUserRole: state.auth.currentUserRole,
  };
}

export default connect(mapStateToProps)(Layout);
