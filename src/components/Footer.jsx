import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {
  
  render() {
    return (
      <div className="Footer container-fluid bg-light">
        <div className="row">
          <div className="col-12 py-3 text-center">
            FreeGenes is a project of the BioBricks Foundation.
          </div>  
        </div>  
      </div>
    );
  }
}

export default Footer;
