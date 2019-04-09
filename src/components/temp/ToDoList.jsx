import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import shortid from 'shortid';

class TodoList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.onRecordClick = this.onRecordClick.bind(this);
  }

  onRecordClick(e) {
    let record = this.props.records[e.target.getAttribute('index')];
    this.props.setRecord(record);
  }

  render() {
    const records = this.props.records || [];
    const listItems = records.map((listItem, listItemIndex) => {
      return (
        <button 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          index={listItemIndex}
          onClick={this.onRecordClick}
        >
          {listItem.completed && <i className="mdi mdi-check mr-2 text-success"/>}
          {listItem.title}
        </button>
      );
    });
    return (
      <ul className="TodoList list-group list-group-flush">
        {listItems}
      </ul>
    );
  }
}

export default TodoList;
