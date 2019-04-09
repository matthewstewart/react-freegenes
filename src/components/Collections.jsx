import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
    this.getRecord = this.getRecord.bind(this);
    this.onRecordClick = this.onRecordClick.bind(this);
    this.getData = this.getData.bind(this);
    this.getDataSync = this.getDataSync.bind(this);
  }

  async getRecords() {
    try {
      return await Api.get('/collections/');
    } catch (error) {
      throw error;
    }
  }

  async getRecord(id) {
    try {
      return await Api.get(`/collections/full/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async getData() {
    try {
      const recordId = this.props.match.params.recordId;
      let selectedRecord = null;
      if (recordId){
        selectedRecord = await this.getRecord(recordId);
      }
      const records = await this.getRecords();
      return {
        records,
        selectedRecord
      };
    } catch (error) {
      throw error;
    }  
  }

  getDataSync() {
    this.getData()
    .then(res => {
      const { records, selectedRecord } = res;
      this.setState({
        records,
        selectedRecord
      });
    })
    .catch(error => {
      throw error;
    });
  }

  onRecordClick(e) {
    let record = this.state.records[e.target.getAttribute('index')];
    this.setState({record});
  }

  componentDidUpdate(prevProps, prevState) {
    const prevId = prevProps.match.params.recordId;
    const currentId = this.props.match.params.recordId;
    if (currentId && prevId !== currentId) {
      this.getDataSync();
    }
  }

  componentDidMount() {
    this.getDataSync();
  }

  render() {
    const records = this.state.records;
    const recordListItems = records.map((record, recordIndex) => {
      return (
        <NavLink 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/collections/${record.uuid}`}
          //index={recordIndex}
          //onClick={this.onRecordClick}
        >
          {record.name}
        </NavLink>
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
            {this.state.selectedRecord && (
              <div className="card mt-3">
                <div className="card-header">
                  {this.state.selectedRecord.name}
                </div>
                <div className="card-body">
                  <pre>{JSON.stringify(this.state.selectedRecord, null, 2)}</pre>
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
