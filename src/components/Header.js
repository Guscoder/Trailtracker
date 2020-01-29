import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a
          className="navbar-brand"
          target="_blank "
          href="https://northcountrytrail.org/"
        >
          NCT
        </a>
        <h1 className="text-center text-warning">
          <Link to="/">Trail Maintenance Log</Link>
        </h1>

        <div className="justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <span className="sr-only">(current)</span>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/adminpanel">
                Admin
              </Link>
              <span className="sr-only">(current)</span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
