import React from "react";
import { Link } from "react-router-dom";

import TrailworkList from "./TrailworkList";

const optionsPanel = props => {
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center p-3">
        <Link className="nav-link" to="/trailinputform">
          <button type="button" className="btn btn-primary mr-3">
            Add Item
          </button>
        </Link>
        <Link className="nav-link" to="/TrailworkList">
          <button type="button" className="btn btn-primary mr-3">
            Incomplete Items
          </button>
        </Link>
        <Link className="nav-link" to="/TrailworkList">
          <button type="button" className="btn btn-primary mr-3">
            Completed Items
          </button>
        </Link>
      </div>
    </div>
  );
};

export default optionsPanel;
