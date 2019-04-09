import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  
  render() {
    return (
      <div className="Landing container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                FreeGenes
              </div>
              <div className="card-body">
                Welcome To FreeGenes.
              </div>
              <ul className="list-group list-group-flush">
                <Link 
                  to="/collections"
                  className="list-group-item list-group-item-action"
                >
                  Collections
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
