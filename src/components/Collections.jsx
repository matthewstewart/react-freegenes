import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Collections extends Component {
  
  render() {
    return (
      <div className="Collections container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                Collections
              </div>
              <div className="card-body">
                Welcome To FreeGenes.
              </div>
              <ul className="list-group list-group-flush">
                <Link 
                  to="/"
                  className="list-group-item list-group-item-action"
                >
                  Home
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Collections;
