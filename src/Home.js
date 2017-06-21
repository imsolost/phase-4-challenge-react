import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import './App.css'
import Library from './Library'
import RecentReviews from './RecentReviews'
import { Link } from 'react-router'

class Home extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      albums: [],
      reviews: [],
      users: [],
      currentUser: '',
      searchString: ''
    }
  }

  componentDidMount() {
    this.getAllAlbums()
    this.getAllReviews()
    this.getAllUsers()
  }

  getAllAlbums() {
    fetch('http://localhost:5000/albums', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { albums: results } ) )
  }

  getAllReviews() {
    fetch( 'http://localhost:5000/reviews', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { reviews: results } ) )
  }

  getAllUsers() {
    fetch( 'http://localhost:5000/users', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { users: results } ) )
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

        <div className="records-reviews-wrapper">
          <div className="records-column">
            <h1> Records </h1>
            <Library albums={this.state.albums} />
          </div>
          <div className="RecentReviews-column">
            <h1> Recent Reviews </h1>
            <RecentReviews albums={this.state.albums} reviews={this.state.reviews} users={this.state.users}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
