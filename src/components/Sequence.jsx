import React, { Component } from 'react';

class Sequence extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }
  
  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div className="Sequence mt-2">
        <strong>{this.props.title}</strong>:&nbsp; 
        {this.state.expanded ? (
          <button 
            className="btn btn-sm btn-primary"
            onClick={this.toggleExpanded}
          >
            Hide
          </button>
        ) : (
          <button 
            className="btn btn-sm btn-primary"
            onClick={this.toggleExpanded}
          >
            Show
          </button>
        )}
        {this.state.expanded && (
          <><br/>{this.props.content}</>
        )}
      </div>
    );
  }
}

export default Sequence;
