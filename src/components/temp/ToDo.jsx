import React, { Component } from 'react';

class ToDo extends Component {

  render() {
    return (
      <div className="ToDo card mt-3">
        <div className="card-header text-capitalize">
          {this.props.record.title}
        </div>
        <div className="card-body">
          <pre>{JSON.stringify(this.props.record, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default ToDo;
