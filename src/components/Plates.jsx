import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../modules/Api';
import shortid from 'shortid';
import './Plates.scss';

class Plates extends Component {
  
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
      return await Api.get('/plates/');
    } catch (error) {
      throw error;
    }
  }

  async getRecord(id) {
    try {
      return await Api.get(`/plates/full/${id}`);
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
        selectedRecord,
        isReady: true
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
      this.setState({ isReady: false });
      this.getDataSync();
    }
  }

  componentDidMount() {
    this.getDataSync();
  }

  render() {
    const records = this.state.records;
    const selectedRecord = this.state.selectedRecord;
    const recordListItems = records.map((record, recordIndex) => {
      return (
        <NavLink 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/plates/${record.uuid}`}
        >
          {record.plate_name}
        </NavLink>
      );
    });
    return (
      <div className="Plates container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                Plates
              </div>
              <div className="card-body">
                {this.state.isReady ? (
                  <div className="card-text">
                    {records.length} Plates were found.
                    {selectedRecord && <><br/>1 Plate with id {selectedRecord.uuid} found.</>}
                  </div>
                ) : (
                  <div className="card-text">
                    Fetching Plates from the API...
                  </div>
                )}
              </div>
              <ul className="list-group list-group-flush">
                {recordListItems}
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {selectedRecord && (
              <>
                <div className="card mt-3">
                  <div className="card-header text-capitalize">
                    {selectedRecord.plate_name}
                  </div>
                  <div className="card-body">
                    {/* <pre>{JSON.stringify(this.state.selectedRecord, null, 2)}</pre> */}
                    <div className="card-text">
                      {selectedRecord.breadcrumb && (<><strong>Location</strong>: {selectedRecord.breadcrumb}<br/></>)}
                      {selectedRecord.plate_form && (<><strong>Form</strong>: {selectedRecord.plate_form}<br/></>)}
                      {selectedRecord.plate_type && (<><strong>Type</strong>: {selectedRecord.plate_type}<br/></>)}
                      {selectedRecord.status && (<><strong>Status</strong>: {selectedRecord.status}</>)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Plates;
