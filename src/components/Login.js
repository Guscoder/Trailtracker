import React from "react";

const Login = props => {
  return (
    <div className="container-fluid">
      <form>
        <div className="form-group row">
          <label htmlFor="inputUserName" className="col-sm-2 col-form-label">
            Username(email)
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputUserName"
              placeholder="Email"
            ></input>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
            ></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
