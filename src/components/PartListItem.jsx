import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import Api from '../modules/Api';
import shortid from 'shortid';

class PartListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: true
    };
  }

  render() {
    const collection = this.props.collection;
    const part = this.props.part;
    return (
      <NavLink 
        key={shortid.generate()}
        className="list-group-item list-group-item-action"
        to={`/collections/${collection.uuid}/parts/${part}`}
      >
        {part}
      </NavLink>
    );
  }
}

export default PartListItem;
