import React, { Component } from 'react';
import './App.scss';

import Router from './components/Router';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({isReady: true});
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        {this.state.isReady ? <Router /> : (<div>Loading...</div>)}
      </div>
    );
  }
}

export default App;
