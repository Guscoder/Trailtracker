import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';

import TrailInputForm from './forms/TrailInputForm';
import TrailworkList from './TrailworkList';
import OptionsPanel from './OptionsPanel';
import Login from './Login';
import Home from './Home';
import ViewTrailItem from './ViewTrailItem';
import EditableTrailItem from './forms/EditableTrailItem';
import '../styles/config-styles.scss';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <ProtectedRoute
              exact
              path='/optionspanel'
              component={OptionsPanel}
              isAuthenticated={isAuthenticated}
              isVerifying={isVerifying}
            />
            <Route path='/trailinputform' exact component={TrailInputForm} />
            <Route
              path='/Trailworklist/:listStatus'
              component={TrailworkList}
            />
            <Route path='/TrailworkItem' component={ViewTrailItem} />
            <Route path='/EditableTrailItem' component={EditableTrailItem} />
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
  };
}

export default connect(mapStateToProps)(App);
