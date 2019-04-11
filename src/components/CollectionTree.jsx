import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import Api from '../modules/Api';
import Tree from '../modules/Tree';
import { Treebeard } from 'react-treebeard';
import CollectionTreeStyles from './CollectionTreeStyles';

class CollectionTree extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      collections: null,
      collection: null,
      tree: null,
      cursor: {
        active: false
      }
    };
    this.getData = this.getData.bind(this);
    this.getDataSync = this.getDataSync.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  async getData() {
    try {
      const collections = this.state.collections;
      let result = { collections, collection: null };
      const collectionID = this.props.match.params.collectionID;
      if (collectionID) {
        result.collection = await Api.get(`/collections/recurse/${collectionID}`);
      }
      if (!collections) {
        result.collections = await Api.get(`/collections/`);
      }
      return result;  
    } catch (error) {
      throw error;
    }
  }

  getDataSync() {
    this.getData()
    .then(res => {
      const { collections, collection } = res;
      const tree = collection !== null ? this.treebeardize(collection) : null; 
      this.setState({ collections, collection, tree, isReady: true });
    })
    .catch(error => {
      throw error;
    });
  }

  treebeardize(collection) {
    console.log('treebeardize', collection);
    return Tree.convertCollection(collection);
  }

  onToggle(node, toggled){
    let cursor = this.state.cursor;
    if(cursor){cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevId = prevProps.match.params.collectionID;
    const currentId = this.props.match.params.collectionID;
    if (currentId && prevId !== currentId) {
      this.setState({ 
        isReady: false
      });
      this.getDataSync();
    }
  }

  componentDidMount() {
    this.getDataSync();
  }

  render() {
    const { isReady, collections, collection, tree } = this.state;
    // const instructions = collection ? '' : 'Select a Collection from the list below.';
    const collectionList = collections ? collections : [];
    const collectionListItems = [].concat(collectionList)
    .sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (a.name < b.name) { return -1; }
      return 0;
    })
    .map((record, recordIndex) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/collection-tree/${record.uuid}`}
        >
          {record.name}
        </Link>
      );
    });
    return (
      <div className="CollectionTree container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-header">
                {!collection ? 'Collection Tree' : collection.name } {!isReady && <> Loading...</>}
              </div>
              {isReady && collections && !collection && (
                <ul className="list-group list-group-flush">
                  {collectionListItems}
                </ul>
              )}
              {tree && (
                <div className="card-tree">
                  <Treebeard
                    style={CollectionTreeStyles}
                    data={tree}
                    onToggle={this.onToggle}
                  />
                </div>
              )}
            </div>
          </div>
          {/* <div className="col-xs-12 col-md-6">
            <div className="card mt-3">
              <div className="card-body">
                <pre>{JSON.stringify(this.state.collection, null, 2)}</pre>
              </div>
            </div>
          </div>             */}
        </div>
      </div>
    );
  }
}

export default CollectionTree;
