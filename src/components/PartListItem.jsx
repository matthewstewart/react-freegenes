import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Markdown from 'react-markdown';
import shortid from 'shortid';
import Sequence from './Sequence';

class PartListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: true
    };
  }

  render() {
    const collection = this.props.collection;
    const collectionID = collection.uuid;
    const part = this.props.part;
    const partIsText = typeof part === 'string';
    const partID = partIsText ? part : part.uuid;
    const route = `/collections/${collectionID}/parts/${partID}`;
    const prevRoute = `/collections/${collectionID}`;
    const paramCollectionID = this.props.match.params.recordId;
    const paramPartID = this.props.match.params.partId;
    const isSelected = collectionID === paramCollectionID && partID === paramPartID;
    if (isSelected) {
      let tags = null;
      return (
        <>
          <Link 
            className="list-group-item list-group-item-action bg-primary text-white"
            to={prevRoute}
          >
            {part.name} 
          </Link>        
          <div className="card-body">
            <h4 className="card-title">{part.name}</h4>
            {part.time_created && <><strong>Created</strong>: {part.time_created}<br/></>}
            {part.time_updated && <><strong>Updated</strong>: {part.time_updated}<br/></>}
            {part.gene_id && <><strong>Gene ID</strong>: {part.gene_id}<br/></>}
            {part.description && <Markdown source={part.description} />}
            {part.full_sequence && <Sequence title="Full Sequence" content={part.full_sequence}/>}
            {part.optimized_sequence && <Sequence title="Optimized Sequence" content={part.optimized_sequence}/>}
            {part.original_sequence && <Sequence title="Original Sequence" content={part.original_sequence}/>}
            {part.synthesized_sequence && <Sequence title="Synthesized Sequence" content={part.synthesized_sequence}/>}
            {part.tags && part.tags.length > 0 && <>{tags}</>}
            {/* <pre>{JSON.stringify(part, null, 2)}</pre> */}
          </div>
        </>
      );
    } else {
      return (
        <NavLink 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={route}
        >
          {part.name}
        </NavLink>
      );
    }  
  }
}

export default PartListItem;
