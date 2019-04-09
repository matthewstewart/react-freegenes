import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Collections from './Collections';
import ToDos from './temp/ToDos';

class Router extends Component {
  render() {
    return (
      <div className="Router">
        <Switch>
          <Route exact path="/todos" render={(props) => <ToDos {...props} {...this.props}/>}/>
          <Route exact path="/collections" render={(props) => <Collections {...props} {...this.props}/>}/>
          <Route exact path="/" render={(props) => <Landing {...props} {...this.props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
