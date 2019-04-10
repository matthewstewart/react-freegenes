import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Collections from './Collections';
import Plates from './Plates';
import CollectionTree from './CollectionTree';

class Router extends Component {
  render() {
    return (
      <div className="Router">
        <Switch>
          <Route path="/collection-tree" render={(props) => <CollectionTree {...props} {...this.props}/>}/>
          <Route path="/plates/:recordId" render={(props) => <Plates {...props} {...this.props}/>}/>
          <Route exact path="/plates" render={(props) => <Plates {...props} {...this.props}/>}/>
          <Route path="/collections/:recordId/parts/:partId" render={(props) => <Collections {...props} {...this.props}/>}/>
          <Route path="/collections/:recordId" render={(props) => <Collections {...props} {...this.props}/>}/>
          <Route exact path="/collections" render={(props) => <Collections {...props} {...this.props}/>}/>
          <Route exact path="/" render={(props) => <Landing {...props} {...this.props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
