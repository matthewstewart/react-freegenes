import React, { Component } from 'react';
import './App.scss';

import Loading from './components/Loading';
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
        {this.state.isReady ? (
          <Router 
            {...this.props} 
            {...this.state}
          />
        ) : (
          <Loading 
            title="Loading App..."
            message="Testing the loading state with an intentional 2 second delay..."
          />
        )}
      </div>
    );
  }
}

export default App;
