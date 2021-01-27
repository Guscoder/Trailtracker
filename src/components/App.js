import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout";
import TrailInputForm from "./forms/TrailInputForm";
import VolunteerInputForm from "./forms/VolunteerInputForm";
import TableList from "./TableList";
import TableComplete from "./TableComplete";
import NewItemPreview from "./NewItemPreview";

import HomePage from "./HomePage";
import Login from "./Login";
import Home from "./Home";
import ViewTrailItem from "./ViewTrailItem";
import EditableTrailItem from "./forms/EditableTrailItem";
import AddUser from "./users/AddUser";
import UserList from "./users/UserList";

import "../styles/config-styles.scss";
import "./app.scss";

function App(props) {
  const { isAuthenticated, currentUserRole } = props;
  return (
    <div className='main-app'>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route exact path='/homepage' component={HomePage} />

            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route
                path='/TableList/:listStatus'
                render={(props) => <TableList key={Date.now()} {...props} />}
              />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route
                path='/TableComplete'
                render={(props) => (
                  <TableComplete key={Date.now()} {...props} />
                )}
              />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route path='/trailinputform' exact component={TrailInputForm} />
            ) : (
              <Redirect to='/login' />
            )}
            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route
                path='/newitempreview'
                exact
                render={(props) => <NewItemPreview {...props} />}
              />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route path='/TrailworkItem' component={ViewTrailItem} />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated &&
            (currentUserRole === "ADMIN" || currentUserRole === "SAWYER") ? (
              <Route path='/EditableTrailItem' component={EditableTrailItem} />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated && currentUserRole === "ADMIN" ? (
              <Route path='/users/userlist' component={UserList} />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated && currentUserRole === "ADMIN" ? (
              <Route path='/users/adduser' exact component={AddUser} />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated && currentUserRole === "MAINTAINER" ? (
              <Route
                exact
                path='/volunteerinputform'
                component={VolunteerInputForm}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    currentUserRole: state.auth.currentUserRole,
  };
}

export default connect(mapStateToProps)(App);
