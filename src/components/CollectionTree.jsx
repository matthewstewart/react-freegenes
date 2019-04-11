import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import Api from '../modules/Api';
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
    let result = {
      name: `Collection: ${collection.name}`,
      toggled: true,
      children: [
        {
          name: 'Sub-Collections',
          children: []
        }
        // {
        //   name: 'loading parent',
        //   loading: true,
        //   children: [] 
        // } 
      ]
    };
    const subcollections = collection.subcollections || [];
    for (let i = 0; i < subcollections.length; i++) {
      const subcollection = subcollections[i];
      const subCollectionObj = {
        name: subcollection.name,
        children: [
          {
            name: 'Parts',
            children: []
          }
        ]
      };
      const parts = subcollection.parts;
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j];
        const partObj = {
          name: part.name,
          children: []
        };
        part.time_created && partObj.children.push({ name: `Created: ${part.time_created}`});
        part.time_updated && partObj.children.push({ name: `Updated: ${part.time_updated}`});
        part.description && partObj.children.push({ name: `${part.description}`});
        part.status && partObj.children.push({ name: `Status: ${part.status}`});
        part.gene_id && partObj.children.push({ name: `Gene ID: ${part.gene_id}`});
        part.part_type && partObj.children.push({ name: `Part Type: ${part.part_type}`});
        part.primer_for && partObj.children.push({ name: `Primer For: ${part.primer_for}`});
        part.primer_rev && partObj.children.push({ name: `Primer Rev: ${part.primer_rev}`});
        part.original_sequence && partObj.children.push({ 
          name: `Original Sequence`,
          children: [
            { name: `${part.original_sequence}`}
          ]
        });
        part.optimized_sequence && partObj.children.push({ 
          name: `Optimized Sequence`,
          children: [
            { name: `${part.optimized_sequence}`}
          ]
        });
        part.synthesized_sequence && partObj.children.push({ 
          name: `Synthesized Sequence`,
          children: [
            { name: `${part.synthesized_sequence}`}
          ]
        });
        part.full_sequence && partObj.children.push({ 
          name: `Full Sequence`,
          children: [
            { name: `${part.full_sequence}`}
          ]
        });
        part.genbank && partObj.children.push({ 
          name: `Genbank`,
          children: [
            { name: `EC_number: ${part.genbank.EC_number}`},
            { name: `GenBank_acc: ${part.genbank.GenBank_acc}`},
            { name: `Source: ${part.genbank.Source}`},
            { name: `gene: ${part.genbank.gene}`},
            { name: `gene_synonyms: ${part.genbank.gene_synonyms}`},
            { name: `locus_tag: ${part.genbank.locus_tag}`},
            { name: `note: ${part.genbank.note}`},
            { name: `product: ${part.genbank.product}`},
            { name: `protein_id: ${part.genbank.protein_id}`},
            { name: `translation: ${part.genbank.translation}`}
          ]
        });
        subCollectionObj.children[0].children.push(partObj);
      }
      subCollectionObj.children[0].children.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      });
      subCollectionObj.children[0].name = `Parts (${subCollectionObj.children[0].children.length})`;
      result.children[0].children.push(subCollectionObj);
    }
    result.children[0].children.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (a.name < b.name) { return -1; }
      return 0;
    });
    result.children[0].name = `Sub-Collections (${result.children[0].children.length})`;
    return result;
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
