import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Api from '../modules/Api';
import shortid from 'shortid';

class Collections extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      records: [],
      selectedRecord: null
    };
    this.onRecordClick = this.onRecordClick.bind(this);
  }
  
  onRecordClick(e) {
    let record = this.state.records[e.target.getAttribute('index')];
    this.setState({record});
  }

  componentDidMount() {
    Api.get('/collections/')
    .then(res => {
      console.log('/collections', res);
      this.setState({records: res});
    })
    .catch(error => {
      throw error;
    });
  }

  render() {
    const records = this.state.records;
    const recordListItems = records.map((record, recordIndex) => {
      return (
        <button 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          index={recordIndex}
          onClick={this.onRecordClick}
        >
          {record.name}
        </button>
      );
    });
    return (
      <div className="Collections container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                Collections
              </div>
              <div className="card-body">
                Collections View.
              </div>
              <ul className="list-group list-group-flush">
                {recordListItems}
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {this.state.record && (
              <div className="card mt-3">
                <div className="card-header">
                  {this.state.record.name}
                </div>
                <div className="card-body">
                  <pre>{JSON.stringify(this.state.record, null, 2)}</pre>
                </div>
                {/* <ul className="list-group list-group-flush">
                  {recordListItems}
                </ul> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Collections;
