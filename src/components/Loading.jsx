import React, { Component } from 'react';

class Loading extends Component {
  
  render() {
    return (
      <div className="Loading container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                {this.props.title}
              </div>
              <div className="card-body">
                {this.props.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
