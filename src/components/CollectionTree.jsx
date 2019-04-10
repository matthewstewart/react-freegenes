import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionTree extends Component {
  
  render() {
    return (
      <div className="CollectionTree container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                Collection Tree
              </div>
              <div className="card-body">
                CollectionTree Component
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

export default CollectionTree;
