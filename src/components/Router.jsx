import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';

class Router extends Component {
  render() {
    return (
      <div className="Router">
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} {...this.props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
