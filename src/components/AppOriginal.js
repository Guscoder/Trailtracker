import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';

import TrailInputForm from './forms/TrailInputForm';
import VolunteerInputForm from './forms/VolunteerInputForm';
import TableList from './TableList';
import TrailworkList from './TrailworkList';
import OptionsPanel from './OptionsPanel';
import Login from './Login';
import Home from './Home';
import ViewTrailItem from './ViewTrailItem';
import EditableTrailItem from './forms/EditableTrailItem';
import AddUser from './users/AddUser';
import UserList from './users/UserList';

import ManageUsers from './users/ManageUsers';
import '../styles/config-styles.scss';

function App(props) {
  const { isAuthenticated, isVerifying, currentUserRole } = props;
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/users/manageusers' exact component={ManageUsers} />
            <Route path='/users/adduser' exact component={AddUser} />
            <Route path='/EditableTrailItem' component={EditableTrailItem} />
            <Route path='/TrailworkItem' component={ViewTrailItem} />
            <Route path='/volunteerinput' component={VolunteerInputForm} />
            <Route path='/users/userlist' component={UserList} />

            <Route
              path='/TableList/:listStatus'
              render={(props) => <TableList key={Date.now()} {...props} />}
            />
            <Route
              path='/TrailWorkList/:listStatus'
              render={(props) => <TrailworkList key={Date.now()} {...props} />}
            />
            <ProtectedRoute
              exact
              path='/optionspanel'
              component={OptionsPanel}
              isAuthenticated={isAuthenticated}
              isVerifying={isVerifying}
            />
            {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route path='/trailinputform' exact component={TrailInputForm} />
            ) : (
              <Redirect to='/login' />
            )}
            {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route path='/users/adduser' exact component={AddUser} />
            ) : (
              <Redirect to='/login' />
            )}

            {/* {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route path='/users/manageusers' exact component={ManageUsers} />
            ) : (
              <Redirect to='/login' />
            )} */}
            {/* <Route path='/users/adduser' exact component={AddUser} /> */}
            {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route
                path='/Trailworklist/:listStatus'
                render={(props) => (
                  <TrailworkList key={Date.now()} {...props} />
                )}
              />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route path='/TrailworkItem' component={ViewTrailItem} />
            ) : (
              <Redirect to='/login' />
            )}

            {isAuthenticated && currentUserRole === 'ADMIN' ? (
              <Route path='/EditableTrailItem' component={EditableTrailItem} />
            ) : (
              <Redirect to='/login' />
            )}

            <Route path='/users/manageusers' exact component={ManageUsers} />
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
