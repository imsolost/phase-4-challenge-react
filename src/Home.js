import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import './App.css'

class Home extends Component {

  render() {

    return (

      <div className="App">
        <div className="App-header">
          <h2>VINYL</h2>
          <img src={icon} className="App-logo" alt="logo" />
        </div>

      </div>

    );
  }
}

export default Home;
