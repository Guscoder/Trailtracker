import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  currentUserRole,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
