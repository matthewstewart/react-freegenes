import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Markdown from 'react-markdown';
import Api from '../modules/Api';
import shortid from 'shortid';
import './Collections.scss';
import PartListItem from './PartListItem';


class Collections extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      records: [],
      selectedRecord: null,
      parts: null,
      selectedPart: null
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

  async getParts(id) {
    try {
      return await Api.get(`/parts/collection/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async getData() {
    try {
      const recordId = this.props.match.params.recordId;
      let selectedRecord = null;
      let parts = null;
      if (recordId){
        selectedRecord = await this.getRecord(recordId);
        parts = await this.getParts(recordId);
      }
      const records = await this.getRecords();
      return {
        records,
        selectedRecord,
        parts
      };
    } catch (error) {
      throw error;
    }  
  }

  getDataSync() {
    this.getData()
    .then(res => {
      const { records, selectedRecord, parts } = res;
      this.setState({
        records,
        selectedRecord,
        parts,
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
    const parts = this.state.parts || [];

    const recordListItems = records.map((record, recordIndex) => {
      return (
        <NavLink 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/collections/${record.uuid}`}
        >
          {record.name}
        </NavLink>
      );
    });
    const partListItems = parts.map((part, partIndex) => {
      //const partIsString = typeof part === 'string';
      // if (partIsString) {
      //   return (
      //     <NavLink 
      //       key={shortid.generate()}
      //       className="list-group-item list-group-item-action"
      //       to={`/collections/${this.state.selectedRecord.uuid}/parts/${part}`}
      //     >
      //       {part}
      //     </NavLink>
      //   );
      // } else {
      //   return null;
      // }
      return (
        <PartListItem 
          key={shortid.generate()}
          collection={this.state.selectedRecord}
          part={part}
          {...this.props}
          //className="list-group-item list-group-item-action"
          //to={`/collections/${this.state.selectedRecord.uuid}/parts/${part}`}
        />
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
                {this.state.isReady ? (
                  <div className="card-text">
                    {records.length} Collections were found.
                    {selectedRecord && <><br/>1 Collection with id {selectedRecord.uuid} found.</>}
                  </div>
                ) : (
                  <div className="card-text">
                    Fetching Collections from the API...
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
                    {this.state.isReady ? selectedRecord.name : 'Loading...'}
                  </div>
                  <div className="card-body">
                    {/* <pre>{JSON.stringify(this.state.selectedRecord, null, 2)}</pre> */}
                    {this.state.isReady ? (
                      <div className="card-text">
                        {selectedRecord.time_created && (<><strong>Created</strong>: {selectedRecord.time_created}<br/></>)}
                        {selectedRecord.time_updated && (<><strong>Updated</strong>: {selectedRecord.time_updated}<br/></>)}
                        {selectedRecord.readme && <Markdown source={selectedRecord.readme} />}                      
                        {selectedRecord.status && (<><strong>Status</strong>: {selectedRecord.status}</>)} 
                      </div>
                    ) : (
                      <div className="card-text">Loading Collection...</div>
                    )}  
                  </div>
                </div>
                {this.state.isReady && parts && parts.length > 0 && (
                  <div className="card mt-3">
                    <div className="card-header text-capitalize">
                      {selectedRecord.name} Parts
                    </div>
                    <ul 
                      id="parts-list"
                      className="list-group list-group-flush"
                    >
                      {partListItems && partListItems}
                    </ul>
                  </div>  
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Collections;
