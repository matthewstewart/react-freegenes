import React, { Component } from 'react';
import Api from '../../modules/Api';
import ToDoList from './ToDoList';
import ToDo from './ToDo';

class ToDos extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      records: [],
      record: null
    };
    this.setRecord = this.setRecord.bind(this);
  }
  
  setRecord(record) {
    this.setState({record});
  }

  componentDidMount() {
    Api.getFullURL('https://jsonplaceholder.typicode.com/todos')
    .then(res => {
      //console.log('/todos', res)
      this.setState({
        isReady: true,
        records: res,
        record: null
      });
    })
    .catch(error => {
      throw error;
    });
  }

  render() {
    const appReady = this.props.isReady;
    const listReady = this.state.isReady;
    const isReady = appReady && listReady;
    const records = this.state.records;
    const record = this.state.record;
    return (
      <div className="ToDos container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                ToDos
              </div>
              <div className="card-body">
                {isReady ? (
                  <div className="card-text">{records.length} records returned from test API.</div>
                ) : (
                  <div className="card-text">Loading ToDos from test API...</div>
                )}
              </div>
              {isReady && (
                <ToDoList 
                  records={records}
                  record={record} 
                  setRecord={this.setRecord}
                />
              )}
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {record && <ToDo record={record}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default ToDos;
