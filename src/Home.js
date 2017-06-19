import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import './App.css'
import Library from './Library'
import { Link } from 'react-router'

class Home extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      albums: [],
      searchString: ''
    }
  }

  componentDidMount() {
    this.getAllAlbums()
  }

  componentDidUpdate() {
    if (this.state.searchString.length === 0) {
        this.getAllAlbums()
    }
  }

  getAllAlbums() {
    fetch('http://localhost:5000/all', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { albums: results } ) )
  }

  getSearchedAlbums( input ) {
    fetch(`http://localhost:5000/search/${input}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { albums: results } ) )
  }

  handleSearch( event ) {
    this.setState( { searchString: event.target.value} )
    this.getSearchedAlbums( event.target.value )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h3>VINYL</h3>
          <p>A community for record enthusiasts to review their favorite albums.</p>
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearch.bind(this)}
            placeholder="Search"
          />
          <Link to='/signup'><button>Sign Up</button></Link>
          <Link to='/signin'><button>Sign In</button></Link>
        </div>

        <div className="row">
          <Library albums={this.state.albums} />
        </div>
      </div>
    )
  }
}

export default Home;
