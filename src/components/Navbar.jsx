import React, { Component } from 'react';
import shortid from 'shortid';
//import './Navbar.scss';
import { Link, NavLink, withRouter } from "react-router-dom";
//import Logo from '../images/freegenes-logo.png';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          {/* <img src={Logo} width="40" height="30" className="d-inline-block align-top mr-3" alt="Bionet Logo" /> */}
          FreeGenes
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse"
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">Collections</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
