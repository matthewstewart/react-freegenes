import React, { Component } from 'react';
import './App.scss';

import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Router from './components/Router';
import Footer from './components/Footer';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: true
    };
  }
  
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({isReady: true});
    // }, 2000);
  }

  render() {
    return (
      <div className="App">
        <div className="viewport">
          <Navbar />
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
        <Footer />
      </div>
    );
  }
}

export default App;
