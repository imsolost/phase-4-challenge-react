import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import './App.css'

class Home extends Component {

  render() {

    return (

      <div className="App">
        <div className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h2>VINYL</h2>
          <h3>A community for record enthusiasts to review their favorite albums.</h3>
        </div>

      </div>

    );
  }
}

export default Home;
